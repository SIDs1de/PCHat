import { useState } from 'react'
import { useSignInMutation } from '../../store/api/authApi'
import { setTokens } from '../../utils/tokenUtils'
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const [signIn] = useSignInMutation()
  const [form, setForm] = useState({ username: '', password: '' })

  const dispatch = useDispatch()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = await signIn(form).unwrap()
      setTokens(data.access_token, data.refresh_token)
      dispatch(setCredentials({ user, accessToken, refreshToken }))
    } catch (error) {
      console.error('Не удалось войти в аккаунт:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='username' value={form.username} onChange={handleChange} placeholder='Username' />
      <input name='password' type='password' value={form.password} onChange={handleChange} placeholder='Password' />
      <button type='submit'>Sign In</button>
    </form>
  )
}

export default SignIn
