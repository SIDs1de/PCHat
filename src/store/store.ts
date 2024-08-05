import { combineReducers, configureStore } from '@reduxjs/toolkit'
import burgerReducer from './burgerSlice'
import { tokensApi } from './api/tokensApi'
import { accountActionsApi } from './api/accountActionsApi'
import userReducer, { setAuthorized } from './userSlice'
import { redirect } from 'react-router-dom'
import { getToken, setToken } from '../utils/tokenUtils'

const reducers = combineReducers({
  burger: burgerReducer,
  user: userReducer,
  [tokensApi.reducerPath]: tokensApi.reducer,
  [accountActionsApi.reducerPath]: accountActionsApi.reducer,
})

const redirectMiddleware = store => next => action => {
  console.log('redirectMiddleware', action.type)
  if (action.type === 'user/deauthenticateUser') {
    redirect('/login')
  }

  if (
    action.type === `${accountActionsApi.reducerPath}/executeQuery/fulfilled` &&
    action.meta.arg.endpointName === 'logOut'
  ) {
    redirect('/login')
  }

  if (
    action.type === `${tokensApi.reducerPath}/executeQuery/rejected` &&
    action.meta.arg.endpointName === 'api/refresh'
  ) {
    redirect('/login')
  }

  return next(action)
}

const refreshTokenMiddleware =
  ({ dispatch }) =>
  next =>
  async action => {
    console.log('Ну вот почти', action)
    if (
      action.type === 'tokensApi/executeQuery/rejected' &&
      action.payload?.status === 401 &&
      action.meta.arg.endpointName === 'validateToken'
    ) {
      console.log('ЦАДЛОЫВЖДЛОАЫ')
      const refreshResult = await dispatch(tokensApi.endpoints.refreshToken.initiate())

      if (refreshResult.data) {
        const { access_token } = refreshResult.data
        // setToken(access_token)
        dispatch(setAuthorized({ access_token, authorized: true }))

        const originalAction = action.meta.arg
        next(originalAction)
      } else {
        dispatch(setAuthorized({ access_token: null, authorized: false }))
      }
    }

    return next(action)
  }

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokensApi.middleware, accountActionsApi.middleware, redirectMiddleware, refreshTokenMiddleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
