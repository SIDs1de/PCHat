package auth

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/handler/response"
)

const (
	refreshHeader = "X-Refresh-Token"
)

func (a *Authorization) RefreshAccessToken(c *gin.Context) {
	refreshToken := c.GetHeader(refreshHeader)
	if refreshToken == "" {
		response.NewErrorResonse(c, http.StatusUnauthorized, "Empty refresh header")
		return
	}

	userID, _, err := a.service.TokenService.ParseRefreshToken(refreshToken)
	if err != nil {
		response.NewErrorResonse(c, http.StatusUnauthorized, "Invalid refresh token provided")
		return
	}

	if ok := a.service.TokenService.TokenInBlackList(refreshToken); ok {
		response.NewErrorResonse(c, http.StatusUnauthorized, "Refresh token in blacklist")
		return
	}

	newAccessToken, err := a.service.TokenService.GenerateAccessToken(userID)
	if err != nil {
		response.NewErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"access_token": newAccessToken})
}

func (a *Authorization) Test(c *gin.Context) {
	c.JSON(http.StatusOK, response.StatusResponse{Status: "ok"})
}
