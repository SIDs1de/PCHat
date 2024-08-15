package auth

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/handler/response"
)

const (
	refreshHeader = "refresh_token"
)

func (a *Authorization) NewAccessToken(refreshToken string) (string, error) {
	user, err := a.service.TokenService.ParseRefreshToken(refreshToken)
	if err != nil {
		return "", errors.New("refresh token has expired")
	}

	if inBL := a.service.TokenService.TokenInBlackList(refreshToken); inBL {
		return "", errors.New("refresh token in blacklist")
	}

	newAccessToken, err := a.service.TokenService.GenerateAccessToken(user.Id, user.Name, user.Login)
	if err != nil {
		return "", err
	}

	return newAccessToken, nil
}

func (a *Authorization) Test(c *gin.Context) {
	c.JSON(http.StatusOK, response.StatusResponse{Status: "ok"})
}
