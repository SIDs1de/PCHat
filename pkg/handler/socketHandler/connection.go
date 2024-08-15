package socketHandler

import (
	"github.com/gorilla/websocket"
	"online_chat/pkg/domain/models"
)

func (s *SocketHandler) handleConnection(conn *websocket.Conn, msg *models.Message) error {
	id, err := s.Service.MessageService.Create(*msg)
	if err != nil {
		return err
	}
	msg.Id = id
	return s.loadMessages(conn, msg.Id)
}

func (s *SocketHandler) loadMessages(conn *websocket.Conn, id int) error {
	messages, err := s.Service.GetPart(id)
	if err != nil {
		return err
	}

	history := models.History{
		Event:    "oldMessages",
		Messages: messages,
	}

	return s.sendHistory(history, conn)
}
