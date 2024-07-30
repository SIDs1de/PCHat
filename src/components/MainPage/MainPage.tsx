import styles from './MainPage.module.scss'
import Main from '../Main/Main'
import Aside from '../Aside/Aside'

export default function MainPage() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Aside />
          <Main />
        </div>
      </div>
    </>
  )
}
