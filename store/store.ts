import { accountApi } from '@/services/account'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [accountApi.reducerPath]: accountApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(accountApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
