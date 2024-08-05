import { createSlice } from '@reduxjs/toolkit'
import { clearToken, setToken } from '../utils/tokenUtils'

export interface IUser {
  id: number | null
  name: string | null
  login: string | null
  authorized: boolean
}

const initialState: IUser = {} as IUser

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setLogin: (state, action) => {
      state.login = action.payload
    },
    setId: (state, action) => {
      state.id = action.payload
    },
    setAuthorized: (state, { payload }) => {
      state.authorized = payload.authorized
      if (payload.access_token) {
        setToken(payload.access_token)
      } else {
        clearToken()
      }
    },
    setUser: (state, action) => {
      console.log('setUser', action.payload)
      const { id, name, login, isAuthorized } = action.payload
      return {
        id,
        name,
        login,
        isAuthorized,
      }
    },
    clearUser: state => {
      state.id = null
      state.name = null
      state.login = null
      state.authorized = false
    },
    deauthenticateUser: state => {
      state = initialState
      clearToken()
    },
  },
})

export const { setAuthorized, setId, setName, setLogin, setUser, clearUser } = userSlice.actions
export default userSlice.reducer
