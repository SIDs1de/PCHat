import styles from './MainButtons.module.scss'

export default function MainButtons({ onClick }) {
  return (
    <div className={`${styles['wrapper']}`}>
      <button className={`${styles['enter-btn']}`} onClick={onClick}>
        Войти анонимно
      </button>
      <button className={`${styles['enter-btn']}`} onClick={onClick}>
        Войти в аккаунт
      </button>
      <button className={`${styles['enter-btn']}`} onClick={onClick}>
        Зарегистрироваться
      </button>
    </div>
  )
}
