package message

import "online_chat/pkg/reposiroty"

type MessageService struct {
	messageRepository reposiroty.MessageRepository
}

func NewMessageService(messageRepository reposiroty.MessageRepository) *MessageService {
	return &MessageService{messageRepository: messageRepository}
}
