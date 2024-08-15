package socketHandler

import (
	"github.com/gorilla/websocket"
	"online_chat/pkg/domain/models"
)

func (s *SocketHandler) sendMessage(msg models.Message) {
	for client := range s.Clients {
		err := client.WriteJSON(msg)
		if err != nil {
			_ = client.Close()
			delete(s.Clients, client)
		}
	}
}

func (s *SocketHandler) sendHistory(history models.History, client *websocket.Conn) error {
	err := client.WriteJSON(history)
	if err != nil {
		return err
	}
	return nil
}
