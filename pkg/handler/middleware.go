package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

const (
	authorizationHeader = "Authorization"
	refreshHeader       = "X-Refresh-Token"
	userCtx             = "userID"
)

func (h *Handler) userIdentity(c *gin.Context) {
	header := c.GetHeader(authorizationHeader)
	if header == "" {
		newErrorResonse(c, http.StatusUnauthorized, fmt.Sprintf("empty %s header", authorizationHeader))
		return
	}

	accessToken := strings.Split(header, " ")
	if len(accessToken) != 2 {
		newErrorResonse(c, http.StatusUnauthorized, fmt.Sprintf("invalid %s header", authorizationHeader))
		return
	}

	userID, err := h.Service.TokenService.ParseAccessToken(accessToken[1])
	if err != nil {
		//h.Service.TokenService.GenerateTokens()
		return
	}

	c.Set(userCtx, userID)
}
