package message

import (
	"online_chat/pkg/domain/models"
)

func (s *MessageService) Create(message models.Message) (int, error) {
	return s.messageRepository.Create(message)
}
