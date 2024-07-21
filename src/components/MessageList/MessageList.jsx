import styles from './MessageList.module.scss'

const getDate = time => {
  let date
  if (typeof time === 'string') {
    date = new Date(time)
  } else {
    date = time
  }
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

export default function MessageList({ messages }) {
  return (
    <div className={`${styles['messages']}`}>
      {messages.map(mess => (
        <div key={mess.id}>
          <div className='message'>
            {mess.event === 'connection' ? '' : `${mess['author_name']}. `}
            {getDate(mess['send_at'])}
            {mess.message}
          </div>
        </div>
      ))}
    </div>
  )
}
