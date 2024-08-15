package middleware

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/domain/models"
	"online_chat/pkg/handler/response"
	"online_chat/pkg/service"
	"strings"
)

const (
	authorizationHeader = "Authorization"
	UserCtx             = "user"
)

type Middleware struct {
	service *service.Service
}

func NewMiddleware(service *service.Service) *Middleware {
	return &Middleware{service: service}
}

func (m *Middleware) VerifyAccessToken(c *gin.Context) {
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

	user, err := m.service.TokenService.ParseAccessToken(accessToken[1])
	if err != nil {
		response.NewErrorResonse(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.Set(UserCtx, user)
}

func GetUser(c *gin.Context) (models.ResponseUser, error) {
	user, ok := c.Get(UserCtx)
	if !ok {
		return models.ResponseUser{}, errors.New("user data not found")
	}

	userData, ok := user.(models.ResponseUser)
	if !ok {
		return models.ResponseUser{}, errors.New("user data is of invalid type")
	}
	return userData, nil
}
