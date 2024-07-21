// SignIn.js
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/authSlice'

const SignIn = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(loginUser(form))
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
