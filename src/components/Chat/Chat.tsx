import styles from './Chat.module.scss'
import { useEffect, useState } from 'react'
import useScrollToEnd from '../../hooks/useScrollToEnd'
import useWebSocket from '../../hooks/useWebSocket'
import MainButtons from '../MainButtons/MainButtons'
import MessageForm from '../MessageForm/MessageForm'
import MessageList from '../MessageList/MessageList'

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

  if (!connected) {
    return (
      <section className={`${styles['chat-section']}`}>
        <div className={`${styles['full-height']}`}></div>
        <div className={`${styles['bottom-panel']}`}>
          <MainButtons onClick={connect} />
        </div>
      </section>
    )
  }

  return (
    <section className={`${styles['chat-section']}`}>
      <div ref={scrollableRef} className={styles['chat-inner']}>
        <MessageList messages={messages} />
      </div>
      <div className={`${styles['bottom-panel']}`}>
        <MessageForm value={value} onChange={e => setValue(e.target.value)} onPressEnter={onPressEnter} onSend={() => sendMessage('message', value)} onLoadMore={loadMore} />
      </div>
    </section>
  )
}
