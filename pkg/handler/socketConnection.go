package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
	Event    string `json:"event"`
	ID       int64  `json:"id"`
}

func (h *Handler) handleConnections(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		newErrorResonse(c, http.StatusInternalServerError, err.Error())
		return
	}

	h.SocketHandler.Clients[conn] = true

	go func() {
		if err = h.SocketHandler.ReadMessage(conn); err != nil {
			newErrorResonse(c, http.StatusBadRequest, err.Error())
			return
		}
	}()
}
