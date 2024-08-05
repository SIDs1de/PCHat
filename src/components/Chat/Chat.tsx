import styles from './Chat.module.scss'
import { useEffect, useState } from 'react'
import useScrollToEnd from '../../hooks/useScrollToEnd'
import useWebSocket from '../../hooks/useWebSocket'
import MainButton from '../MainButton/MainButton'
import MessageForm from '../MessageForm/MessageForm'
import MessageList from '../MessageList/MessageList'
import { getToken } from '../../utils/tokenUtils'
import { useActions } from '../../hooks/useActions'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [connected, setConnected] = useState(false)
  const { scrollableRef } = useScrollToEnd(messages)
  const { socketCurrent, sendMessage, connect, loadMore } = useWebSocket({ setValue, setConnected, setMessages, value })

  useEffect(() => {
    return () => {
      if (socketCurrent) {
        socketCurrent.close()
      }
    }
  }, [socketCurrent])

  const onPressEnter = e => {
    if (e.key === 'Enter') {
      sendMessage(value)
      setValue('')
    }
  }
  const access_token = getToken()

  const onEnterClick = async () => {
    if (access_token) {
      // Нужно получить данные пользователя getUser
    } else {
      // Пользователь не авторизован
    }
  }

  return connected ? (
    <section className={`${styles['chat-section']}`}>
      <div ref={scrollableRef} className={styles['chat-inner']}>
        <MessageList messages={messages} />
      </div>
      <div className={`${styles['bottom-panel']}`}>
        <MessageForm
          value={value}
          onChange={e => setValue(e.target.value)}
          onPressEnter={onPressEnter}
          onSend={() => sendMessage('message', value)}
          onLoadMore={loadMore}
        />
      </div>
    </section>
  ) : (
    <section className={`${styles['chat-section']}`}>
      <div className={`${styles['full-height']}`}></div>
      <div className={`${styles['bottom-panel']}`}>
        <MainButton onEnterClick={onEnterClick} />
      </div>
    </section>
  )
}
