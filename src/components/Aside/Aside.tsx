import styles from './Aside.module.scss'
import img from './bg.svg'
import imgLink from './link.svg'
import classNames from 'classnames'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'

export default function Aside() {
  const { toggleBurger } = useActions()
  const {
    burger: { isBurgerOpen },
  } = useTypedSelector(state => state)

  return (
    <aside
      className={classNames(styles.aside, {
        [styles['_wide']]: isBurgerOpen,
      })}
    >
      <section className={`${styles['aside-left']}`}>
        <button
          onClick={() => toggleBurger()}
          className={classNames(styles['burger-btn'], {
            [styles['_opened']]: isBurgerOpen,
          })}
        >
          <div className={`${styles['lines-wrapper']}`}>
            <span className={`${styles['line']}`}></span>
            <span className={`${styles['line']}`}></span>
            <span className={`${styles['line']}`}></span>
          </div>
        </button>
        <div className={`${styles['avatar-wrapper']}`}>
          <img className={`${styles['avatar']}`} src='/anon.svg'></img>
        </div>
      </section>
      <section
        className={classNames(`${styles['aside-main']}`, {
          [styles['_wide']]: isBurgerOpen,
        })}
      >
        <div className={styles['buttons-wrapper']}>
          <div className={`${styles['top']}`}>
            <button>
              <img src={imgLink} alt='' />
              <span>Топ по лайкам</span>
            </button>
            <button>
              <img src={imgLink} alt='' />
              <span>Топ по лайкам</span>
            </button>
            <button>
              <img src={imgLink} alt='' />
              <span>Топ по лайкам</span>
            </button>
          </div>
          <div className={`${styles['bottom']}`}>
            <button>Аноним #12482</button>
          </div>
        </div>
      </section>
      <img src={img} className={`${styles['bg']}`} />
    </aside>
  )
}
