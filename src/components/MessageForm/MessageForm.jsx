import styles from './MessageForm.module.scss'
import sendImg from './send.svg'

export default function MessageForm({ value, onChange, onPressEnter, onSend, onLoadMore }) {
  return (
    <div className={`${styles['form']}`}>
      <input className={`${styles['text-input']}`} value={value} onKeyDown={onPressEnter} onChange={onChange} type='text' placeholder='Введите сообщение' />
      <div className={`${styles['buttons-wrapper']}`}>
        <button className={`${styles['send-btn']}`} onClick={onSend}>
          <img src={sendImg} alt='Отправить' />
        </button>
        <button className={`${styles['loadMore-btn']}`} onClick={onLoadMore}>
          Больше
        </button>
      </div>
    </div>
  )
}
