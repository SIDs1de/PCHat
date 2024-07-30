import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authAPI } from './api/authApi'
import burgerReducer from './burgerSlice'

const reducers = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  burger: burgerReducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authAPI.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
