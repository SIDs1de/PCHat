package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/model"
)

func (h *Handler) SignUp(c *gin.Context) {
	var input model.User

	if err := c.BindJSON(&input); err != nil {
		newErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.Service.UserService.Create(&input)
	if err != nil {
		newErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"id": id})
}

type signInInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (h *Handler) SignIn(c *gin.Context) {
	var input signInInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}

	refresh_token, access_token, err := h.Service.TokenService.GenerateTokens(input.Username, input.Password)
	if err != nil {
		newErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"refresh_token": refresh_token, "access_token": access_token})
}

func (h *Handler) LogOut(c *gin.Context) {
	header := c.GetHeader(refreshHeader)
	if header == "" {
		newErrorResonse(c, http.StatusUnauthorized, "empty refresh header")
		return
	}

	expiresAt, err := h.Service.TokenService.ParseRefreshToken(header)
	if err != nil {
		newErrorResonse(c, http.StatusUnauthorized, err.Error())
		return
	}

	if err = h.Service.TokenService.AddTokenToBlacklist(header, expiresAt); err != nil {
		newErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"status": "ok"})
}
