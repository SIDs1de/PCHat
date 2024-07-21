import styles from './Aside.module.scss'
import img from './bg.svg'

export default function Aside() {
  return (
    <aside className={styles.aside}>
      <button className={`${styles['burger-btn']}`}>
        <span className={`${styles['line']}`}></span>
        <span className={`${styles['line']}`}></span>
        <span className={`${styles['line']}`}></span>
      </button>
      <img src={img} className={`${styles['bg']}`} />
      <div className={`${styles['avatar-wrapper']}`}>
        <img className={`${styles['avatar']}`} src="/anon.svg"></img>
      </div>
    </aside>
  )
}
