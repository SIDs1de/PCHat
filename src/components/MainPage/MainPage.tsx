import styles from './MainPage.module.scss'
import Main from '../Main/Main'
import Aside from '../Aside/Aside'
import { useEffect } from 'react'
import { useValidateTokenQuery } from '../../store/api/tokensApi'
import { getToken } from '../../utils/tokenUtils'

export default function MainPage() {
  const token = getToken()
  console.log('mainpage', token)
  const { data, error, isLoading, refetch } = useValidateTokenQuery(token, { skip: !token })
  useEffect(() => {
    console.log('MainPage. Такого запроса не должно быть много')
  }, [data])
  useEffect(() => {
    if (token) {
      console.log('Перерендер')
      refetch()
    }
  }, [token, refetch])
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
