import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export const signUp = async (name, username, password) => {
  return apiClient.post('/sign-up', { name, username, password })
}

export const signIn = async (username, password) => {
  return apiClient.post('/sign-in', { username, password })
}

export const logout = async refreshToken => {
  return apiClient.post('/logout', null, {
    headers: {
      'X-Refresh-Token': refreshToken,
    },
  })
}
