package socketHandler

import (
	"github.com/gorilla/websocket"
	"online_chat/pkg/model"
)

func (s *SocketHandler) handleConnection(conn *websocket.Conn, msg model.Message) (int, error) {
	id, err := s.Service.MessageService.Create(msg)
	if err != nil {
		return 0, err
	}
	msg.Id = id
	return msg.Id, s.loadMessages(conn, msg.Id)
}

func (s *SocketHandler) loadMessages(conn *websocket.Conn, id int) error {
	messages, err := s.Service.GetPart(id)
	if err != nil {
		return err
	}

	history := model.History{
		Event:    "oldMessages",
		Messages: messages,
	}

	s.sendHistory(history, conn)
	return nil
}
