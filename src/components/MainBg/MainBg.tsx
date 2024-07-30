import styles from './MainBg.module.scss'

export default function MainBg() {
  return (
    <div className={`${styles['wrapper']}`}>
      <img className={`${styles['img']}`} src="/logo.svg"></img>
      <h1 className={`${styles['h1']}`}>PCHAT</h1>
    </div>
  )
}
