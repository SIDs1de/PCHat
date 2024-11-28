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
    setAccessToken: (state, action: PayloadAction<Pick<IUser, 'accessToken'>>) => {
      state.accessToken = action.payload.accessToken
    },
  },
})

export const { setAccessToken } = userSlice.actions

export default userSlice.reducer
