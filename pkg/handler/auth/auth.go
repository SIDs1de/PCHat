package auth

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/handler/middleware"
	"online_chat/pkg/handler/response"
	"online_chat/pkg/model"
	"online_chat/pkg/service"
)

type Authorization struct {
	service *service.Service
}

func NewAuthorization(service *service.Service) *Authorization {
	return &Authorization{service: service}
}

func (a *Authorization) SignUp(c *gin.Context) {
	var input model.User

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := a.service.UserService.Create(&input)
	if err != nil {
		response.NewErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"id": id})
}

type signInInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (a *Authorization) SignIn(c *gin.Context) {
	var input signInInput

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}

	refresh_token, access_token, err := a.service.TokenService.GenerateTokens(input.Username, input.Password)
	if err != nil {
		response.NewErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"refresh_token": refresh_token, "access_token": access_token})
}

func (a *Authorization) LogOut(c *gin.Context) {
	header := c.GetHeader(middleware.RefreshHeader)
	if header == "" {
		response.NewErrorResonse(c, http.StatusUnauthorized, "empty refresh header")
		return
	}

	_, expiresAt, err := a.service.TokenService.ParseRefreshToken(header)
	if err != nil {
		response.NewErrorResonse(c, http.StatusUnauthorized, err.Error())
		return
	}

	if err = a.service.TokenService.AddTokenToBlacklist(header, expiresAt); err != nil {
		response.NewErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, response.StatusResponse{"ok"})
}
