import Chat from '../Chat/Chat'
import Header from '../Header/Header'
import MainBg from '../MainBg/MainBg'
import styles from './Main.module.scss'

export default function Main() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={`${styles['wrapper']}`}>
        <MainBg />
        <Chat />
      </div>
    </main>
  )
}
