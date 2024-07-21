import { useState, useRef } from 'react'

export default function useWebSocket({ setValue, setConnected, setMessages, value }) {
  const [author_name, setAuthor_name] = useState('')
  const [lastMessageId, setLastMessageId] = useState(0)
  const [currentMessageId, setCurrentMessageId] = useState(0)
  const socket = useRef()

  const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL

  const connect = () => {
    socket.current = new WebSocket(WEBSOCKET_URL)

    socket.current.onopen = () => {
      setConnected(true)
      const name = 'Анонимный пользователь № ' + ('' + Date.now()).slice(-6)
      setAuthor_name(name)
      const message = {
        event: 'connection',
        author_name,
        send_at: new Date(),
        message: `${name} подключился`,
      }
      socket.current.send(JSON.stringify(message))
    }

    socket.current.onmessage = event => {
      const message = JSON.parse(event.data)

      console.log(message)
      switch (message.event) {
        case 'oldMessages':
          if (message.messages) {
            setLastMessageId(message.messages.at(-1).id)
            setMessages(prev => [...message.messages.reverse(), ...prev])
          }
          break

        case 'connection':
          setMessages(prev => [...prev, message])
          setCurrentMessageId(message.id)
          break

        case 'message':
          setMessages(prev => [...prev, message])
          break
      }
    }

    socket.current.onclose = e => {
      if (e.wasClean) {
        console.log('Socket закрыт чисто')
      } else {
        console.error('Socket закрыт. Соединение прервано')
      }
    }
    socket.current.onerror = () => console.error('Socket произошла ошибка')
  }

  const loadMore = () => {
    const message = {
      event: 'loadMoreMessages',
      id: lastMessageId,
    }
    socket.current.send(JSON.stringify(message))
  }

  const sendMessage = async ({ event = 'message', msg = value }) => {
    if (!msg.trim()) return
    const message = {
      author_name,
      message: msg,
      event,
      send_at: new Date(),
      id: currentMessageId + 1,
    }
    socket.current.send(JSON.stringify(message))

    if (event === 'message') {
      setValue('')
    }

    setCurrentMessageId(prev => prev + 1)
  }

  const socketCurrent = socket.current

  return { sendMessage, connect, loadMore, socketCurrent }
}
