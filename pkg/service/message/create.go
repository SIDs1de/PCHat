package message

import (
	"online_chat/pkg/model"
)

func (s *MessageService) Create(message model.Message) (int, error) {
	return s.messageRepository.Create(message)
}
