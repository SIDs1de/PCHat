// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signUp, signIn, logout } from '../api/authApi'
import { setTokens, clearTokens, getTokens } from '../utils/tokenUtils'

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await signUp(userData.name, userData.username, userData.password)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    const response = await signIn(userData.username, userData.password)
    console.log(response)
    setTokens(response.data.access_token, response.data.refresh_token)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    await logout(state.auth.refreshToken)
    clearTokens()
    thunkAPI.dispatch(clearAuthState())
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    clearAuthState: state => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null
        state.accessToken = null
        state.refreshToken = null
      })
  },
})

export const { setCredentials, clearAuthState } = authSlice.actions

export default authSlice.reducer
