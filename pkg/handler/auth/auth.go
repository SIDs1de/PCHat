package auth

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/domain/models"
	"online_chat/pkg/handler/response"
	"online_chat/pkg/service"
)

const (
	ExpiredCookie = 3600 * 24 * 7
)

type Authorization struct {
	service *service.Service
}

func NewAuthorization(service *service.Service) *Authorization {
	return &Authorization{service: service}
}

type signUpInput struct {
	Name     string `json:"name" binding:"required,max=20"`
	Login    string `json:"login" binding:"required,min=4,max=20"`
	Password string `json:"password" binding:"required,min=5"`
}

type signInInput struct {
	Login    string `json:"login" binding:"required,min=4,max=20"`
	Password string `json:"password" binding:"required,min=5"`
}

func (a *Authorization) SignUp(c *gin.Context) {
	var input signUpInput

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := a.service.UserService.Create(&models.User{
		Name:     input.Name,
		Login:    input.Login,
		Password: input.Password,
	})
	if err != nil {
		response.NewErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"id": id})
}

func (a *Authorization) SignIn(c *gin.Context) {
	var input signInInput

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}

	refreshToken, accessToken, err := a.service.UserService.Login(input.Login, input.Password)
	if err != nil {
		if err.Error() == "invalid credentials" {
			response.NewErrorResonse(c, http.StatusUnauthorized, "invalid credentials")
		} else {
			response.NewErrorResonse(c, http.StatusInternalServerError, err.Error())
		}
		return
	}

	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie(refreshHeader, refreshToken, ExpiredCookie, "/", "", false, true)

	c.JSON(http.StatusOK, map[string]interface{}{"access_token": accessToken})
}

func (a *Authorization) LogOut(c *gin.Context) {
	refreshToken, err := c.Cookie(refreshHeader)
	if err != nil {
		response.NewErrorResonse(c, http.StatusUnauthorized, "Refresh token not found")
		return
	}

	expiresAt, err := a.service.TokenService.ParseExpireRefreshToken(refreshToken)
	if err != nil {
		response.NewErrorResonse(c, http.StatusUnauthorized, err.Error())
		return
	}

	if err = a.service.TokenService.AddTokenToBlacklist(refreshToken, expiresAt); err != nil {
		response.NewErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.SetCookie(refreshHeader, refreshToken, -1, "/", "", false, true)

	c.JSON(http.StatusOK, response.StatusResponse{Status: "ok"})
}

func (a *Authorization) RefreshAccessToken(c *gin.Context) {
	refreshToken, err := c.Cookie(refreshHeader)
	if err != nil {
		response.NewErrorResonse(c, http.StatusUnauthorized, "Refresh token not found")
		return
	}

	newAccessToken, err := a.NewAccessToken(refreshToken)
	if err != nil {
		c.SetCookie(refreshHeader, refreshToken, -1, "/", "", false, true)

		response.NewErrorResonse(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"access_token": newAccessToken})
}
