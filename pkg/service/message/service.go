package message

import (
	"online_chat/pkg/repository"
)

type MessageService struct {
	messageRepository repository.MessageRepository
}

func NewMessageService(messageRepository repository.MessageRepository) *MessageService {
	return &MessageService{messageRepository: messageRepository}
}
