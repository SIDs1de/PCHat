import styles from './MainButton.module.scss'

export default function MainButton({ onEnterClick }) {
  return (
    <div className={`${styles['wrapper']}`}>
      <button className={`${styles['enter-btn']}`} onClick={onEnterClick}>
        Войти в чат
      </button>
    </div>
  )
}
