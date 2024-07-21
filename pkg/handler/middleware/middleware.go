package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/handler/response"
	"online_chat/pkg/service"
	"strings"
)

const (
	authorizationHeader = "Authorization"
	userCtx             = "userID"
)

type Middleware struct {
	service *service.Service
}

func NewMiddleware(service *service.Service) *Middleware {
	return &Middleware{service: service}
}

func (m *Middleware) UserIdentity(c *gin.Context) {
	header := c.GetHeader(authorizationHeader)
	if header == "" {
		response.NewErrorResonse(c, http.StatusUnauthorized, "Authorization header is required")
		return
	}

	accessToken := strings.Split(header, " ")
	if len(accessToken) != 2 {
		response.NewErrorResonse(c, http.StatusUnauthorized, "Bearer token is required")
		return
	}

	userID, err := m.service.TokenService.ParseAccessToken(accessToken[1])
	if err != nil {
		response.NewErrorResonse(c, http.StatusUnauthorized, "Invalid access token")
		return
	}

	c.Set(userCtx, userID)
}
