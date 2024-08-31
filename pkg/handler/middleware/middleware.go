package middleware

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/domain/models"
	"online_chat/pkg/handler/response"
	"online_chat/pkg/service"
)

const (
	authorizationQuery = "access_token"
	UserCtx            = "user"
)

type Middleware struct {
	service *service.Service
}

func NewMiddleware(service *service.Service) *Middleware {
	return &Middleware{service: service}
}

func (m *Middleware) VerifyAccessToken(c *gin.Context) {
	query := c.Query(authorizationQuery)
	if query == "" {
		response.NewErrorResonse(c, http.StatusUnauthorized, "Access token is required")
		return
	}

	user, err := m.service.TokenService.ParseAccessToken(query)
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
