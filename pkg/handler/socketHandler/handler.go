package socketHandler

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"online_chat/pkg/domain/models"
	"online_chat/pkg/service"
)

type SocketHandler struct {
	Clients map[*websocket.Conn]bool
	Service *service.Service
}

func NewSocketHandler(clients map[*websocket.Conn]bool, service *service.Service) *SocketHandler {
	return &SocketHandler{Clients: clients, Service: service}
}

func (s *SocketHandler) ReadMessage(c *gin.Context, conn *websocket.Conn) error {
	defer conn.Close()
	for {
		var msg models.Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			delete(s.Clients, conn)
			return nil
		}

		switch msg.Event {
		case "message":
			msg.Id, err = s.Service.MessageService.Create(msg)
		case "connection":
			err = s.handleConnection(conn, &msg)
		case "loadMoreMessages":
			err = s.loadMessages(conn, msg.Id)
		}

		if err != nil {
			delete(s.Clients, conn)
			return err
		}

		s.sendMessage(msg)
	}
}
