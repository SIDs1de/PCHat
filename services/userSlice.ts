import { IUser } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: IUser = {
  name: '',
  accessToken: '',
  id: null,
  login: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      Object.assign(state, action.payload)
    },

    clearUser: state => {
      Object.assign(state, initialState)
    },

    setName: (state, action: PayloadAction<Pick<IUser, 'name'>>) => {
      state.name = action.payload.name
    },

    setAccessToken: (state, action: PayloadAction<Pick<IUser, 'accessToken'>>) => {
      state.accessToken = action.payload.accessToken
    },

    setId: (state, action: PayloadAction<Pick<IUser, 'id'>>) => {
      state.id = action.payload.id
    },

    setLogin: (state, action: PayloadAction<Pick<IUser, 'login'>>) => {
      state.login = action.payload.login
    },
  },
})

export const { setUser, clearUser, setAccessToken, setId, setLogin, setName } = userSlice.actions

export default userSlice.reducer
