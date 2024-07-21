package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"online_chat/pkg/model"
)

func (h *Handler) create(c *gin.Context) {
	var input model.Message
	if err := c.BindJSON(&input); err != nil {
		newErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.Service.MessageService.Create(input)
	if err != nil {
		newErrorResonse(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}
