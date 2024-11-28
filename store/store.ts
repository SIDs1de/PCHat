import { accountApi } from '@/services/account'
import { authApi } from '@/services/apiSlice'
import userSlice from '@/services/userSlice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      [accountApi.reducerPath]: accountApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(accountApi.middleware).concat(authApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
