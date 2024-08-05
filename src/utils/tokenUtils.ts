export const setToken = access_token => {
  localStorage.setItem('access_token', access_token)
}

export const clearToken = () => {
  localStorage.removeItem('access_token')
}

export const getToken = () => {
  return localStorage.getItem('access_token')
}
