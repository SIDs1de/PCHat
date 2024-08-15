package user

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/handler/middleware"
	"online_chat/pkg/handler/response"
	"online_chat/pkg/service"
)

type UserHandler struct {
	service *service.Service
}

func NewUserHandler(service *service.Service) *UserHandler {
	return &UserHandler{service: service}
}

func (u *UserHandler) IdentificationUser(c *gin.Context) {
	user, err := middleware.GetUser(c)
	if err != nil {
		response.NewErrorResonse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusOK, user)
}
