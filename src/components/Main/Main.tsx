import { useState } from 'react'
import Chat from '../Chat/Chat'
import Header from '../Header/Header'
import MainBg from '../MainBg/MainBg'
import styles from './Main.module.scss'
import { useActions } from '../../hooks/useActions'
import { useSignUpMutation } from '../../store/api/accountActionsApi'

export default function Main() {
  const [regForm, setRegForm] = useState({
    name: '',
    login: '',
    password: '',
  })

  const [signInForm, setSignInForm] = useState({

  })

  const [signUpAction, { isLoading, error, data }] = useSignUpMutation()

  const signUp = async e => {
    e.preventDefault()
    try {
      const { name, login, password } = regForm
      await signUpAction({
        name,
        login,
        password,
      }).unwrap()
    } catch (err) {
      console.error(err)
    }
  }

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
