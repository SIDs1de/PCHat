// SignUp.js
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/authSlice'

const SignUp = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ name: '', username: '', password: '' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(registerUser(form))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='name' value={form.name} onChange={handleChange} placeholder='Name' />
      <input name='username' value={form.username} onChange={handleChange} placeholder='Username' />
      <input name='password' type='password' value={form.password} onChange={handleChange} placeholder='Password' />
      <button type='submit'>Sign Up</button>
    </form>
  )
}

export default SignUp
