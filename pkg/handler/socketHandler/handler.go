package socketHandler

import (
	"github.com/gorilla/websocket"
	"online_chat/pkg/model"
	"online_chat/pkg/service"
)

type SocketHandler struct {
	Clients map[*websocket.Conn]bool
	Service *service.Service
}

func (s *SocketHandler) ReadMessage(conn *websocket.Conn) error {
	defer conn.Close()
	for {
		var msg model.Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			delete(s.Clients, conn)
			return nil
		}

		//msg.AuthorID =

		switch msg.Event {
		case "message":
			_, err = s.Service.MessageService.Create(msg)
		case "connection":
			msg.Id, err = s.handleConnection(conn, msg)
		case "loadMoreMessages":
			err = s.loadMessages(conn, msg.Id)
		}

		if err != nil {
			return err
		}

		s.sendMessage(msg)
	}
	return nil
}