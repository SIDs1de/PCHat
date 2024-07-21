package socketHandler

import (
	"github.com/gorilla/websocket"
	"online_chat/pkg/model"
)

func (s *SocketHandler) sendMessage(msg model.Message) {
	for client := range s.Clients {
		err := client.WriteJSON(msg)
		if err != nil {
			_ = client.Close()
			delete(s.Clients, client)
		}
	}
}

func (s *SocketHandler) sendHistory(history model.History, client *websocket.Conn) {
	err := client.WriteJSON(history)
	if err != nil {
		_ = client.Close()
		delete(s.Clients, client)
	}
}
