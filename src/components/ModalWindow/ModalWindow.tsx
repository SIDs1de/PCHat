import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { useLogOutMutation, useSignInMutation, useSignUpMutation } from '../../store/api/accountActionsApi'
import { useValidateTokenQuery } from '../../store/api/tokensApi'
import { getToken } from '../../utils/tokenUtils'

export default function ModalWindow() {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [signUp, { isLoading, isError, isSuccess, error }] = useSignUpMutation()
  const [signIn] = useSignInMutation()
  const [token, setToken] = useState(null)
  const { data, refetch } = useValidateTokenQuery(token, { skip: !token })
  const [logout] = useLogOutMutation()

  useEffect(() => {
    if (token) {
      console.log('Перерендер!!!!!')
      refetch()
    }
  }, [token, refetch])
  const closeModal = () => {
    setModalIsOpen(false)
  }
  const [regForm, setRegForm] = useState({
    name: '',
    login: '',
    password: '',
  })
  const [logForm, setLogForm] = useState({
    login: '',
    password: '',
  })

  const regFormSubmit = async e => {
    e.preventDefault()
    await signUp(regForm).unwrap()
  }

  const logFormSubmit = async e => {
    e.preventDefault()
    await signIn(logForm).unwrap()
    const token = getToken()
    setToken(token)
    console.log('После должен быть перерендер', token)
  }

  const logOutClick = () => {
    logout()
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          zIndex: 500,
          padding: '70px',
        },
        content: {
          position: 'relative',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #ccc',
          background: '#fff',
          margin: 'auto', // Делаем окно центром
          marginBottom: '20px',
          minHeight: '600px',
        },
      }}
    >
      <h2>Авторизоваться</h2>

      <form onSubmit={regFormSubmit}>
        <input
          type='text'
          placeholder='Имя'
          value={regForm.name}
          onChange={e => setRegForm(prev => ({ ...prev, name: e.target.value }))}
        />
        <input
          type='text'
          placeholder='Никнейм'
          value={regForm.login}
          onChange={e => setRegForm(prev => ({ ...prev, login: e.target.value }))}
        />
        <input
          type='password'
          placeholder='Пароль'
          value={regForm.password}
          onChange={e => setRegForm(prev => ({ ...prev, password: e.target.value }))}
        />
        <button>Зарегистрироваться</button>
      </form>
      <br />

      <form onSubmit={logFormSubmit}>
        <input
          type='text'
          placeholder='Никнейм'
          value={logForm.login}
          onChange={e => setLogForm(prev => ({ ...prev, login: e.target.value }))}
        />
        <input
          type='password'
          placeholder='Пароль'
          value={logForm.password}
          onChange={e => setLogForm(prev => ({ ...prev, password: e.target.value }))}
        />
        <button>Войти</button>
      </form>
      <br />
      <button onClick={logOutClick}>Выйти из аккаунта</button>

      <p>
        <Link to='/register'>Ещё нет аккаунта? Регистрация</Link>
      </p>
    </Modal>
  )
}
