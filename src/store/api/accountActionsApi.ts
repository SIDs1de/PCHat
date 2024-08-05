import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { clearUser, setUser } from '../userSlice'
import { setToken } from '../../utils/tokenUtils'

const accountActionsApiBaseQuery = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: 'https://192.168.191.53:8000',
    credentials: 'include',
  })(args, api, extraOptions)

  const endpointName = api.endpoint
  if (result.error) {
    const { status, data } = result.error

    if (endpointName === 'signUp') {
      if (status === 400) {
        console.error('Невалидно заполнена форма (неверно указано одно из полей)')
      } else if (status === 500) {
        console.error('Ошибка сервера, попробуйте позже')
      }
    } else if (endpointName === 'signIn') {
      if (status === 400) {
        console.error('Невалидно заполнена форма (неверно указано одно из полей)')
      } else if (status === 401) {
        console.error('Логин или пароль неверны')
      } else if (status === 500) {
        switch (data) {
          case 'incorrect data is specified':
            console.error('Логин или пароль указаны неверно')
            break
          default:
            console.error('Ошибка сервера, попробуйте позже')
        }
      }
    } else if (endpointName === 'logOut') {
      if (status === 401) {
        console.error('Токен в куки не указан или указан неверный')
      } else if (status === 500) {
        console.error('Ошибка сервера')
      }
    }
  }

  if (result) {
    const data = result.data
    if (endpointName === 'signUp') {
      console.log('регистрация data', data)
    } else if (endpointName === 'signIn') {
      console.log('авторизация data', data)
      setToken(data.access_token)
      console.log('здесь')
    } else if (endpointName === 'logOut') {
      api.dispatch(
        clearUser()
      )
      console.log('выход из аккаунта data', data)
    }
  }

  return result
}

export const accountActionsApi = createApi({
  reducerPath: 'accountActionsApi',
  baseQuery: accountActionsApiBaseQuery,
  endpoints: builder => ({
    signUp: builder.mutation({
      query: body => ({
        url: '/sign-up',
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation({
      query: body => ({
        url: '/sign-in',
        method: 'POST',
        body,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST'
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation, useLogOutMutation } = accountActionsApi
