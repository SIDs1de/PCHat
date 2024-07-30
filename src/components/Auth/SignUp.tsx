import { useState } from 'react'
import { useSignUpMutation } from '../../store/api/authApi'
import { setTokens } from '../../utils/tokenUtils'

const SignUp = () => {
  const [signUp] = useSignUpMutation()
  const [form, setForm] = useState({ name: '', username: '', password: '' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = await signUp(form).unwrap()
    } catch (error) {
      console.error('Не удалось зарегистрироваться:', error)
    }
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
