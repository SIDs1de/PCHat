package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/domain/models"
	"online_chat/pkg/handler/response"
)

func (h *Handler) create(c *gin.Context) {
	var input models.Message
	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.Service.MessageService.Create(input)
	if err != nil {
		response.NewErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}
