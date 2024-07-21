import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={`${styles.header}`}>
      {/* <div className={`${styles['header-wrapper']}`}>
        <div className={`${styles['header-img-wrapper']}`}>
          <img src='/logo.svg' className={`${styles['header-img']}`} />
        </div>
      </div> */}
    </header>
  )
}
