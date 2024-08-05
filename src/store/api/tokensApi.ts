import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, setToken } from '../../utils/tokenUtils'
import { setAuthorized, setUser } from '../userSlice'

const tokensApiBaseQuery = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: 'http://192.168.191.53:8000/api',
    credentials: 'include',
    prepareHeaders: headers => {
      const token = getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  })(args, api, extraOptions)

  const endpointName = api.endpoint
  if (result.error) {
    const { status, data } = result.error

    if (endpointName === 'refreshToken') {
      if (status === 401) {
        console.log('tokensApi', data)
        switch (data) {
          case 'Invalid refresh token provided':
          case 'Refresh token not found':
          case 'Refresh token in blacklist':
            console.error('401 ошибка')
            break
          default:
            console.error('Неизвестная ошибка:', data)
        }
      } else if (status === 501) {
        console.error('Ошибка на сервере при создании нового access токена')
      }
    } else if (endpointName === 'validateToken') {
      if (status === 401) {
        console.error('access_token не валиден')
      } else if (status === 500) {
        console.error('Ошибка на сервере')
      }
    }
  }
  if (result) {
    const data = result.data
    if (endpointName === 'refreshToken') {
      const access_token = data.access_token
      api.dispatch(
        setAuthorized({
          access_token,
          authorized: true,
        })
      )
    } else if (endpointName === 'validateToken') {
      console.log('validateToken', data)
      const { id, name, login } = data
      api.dispatch(
        setUser({
          id,
          name,
          login,
          isAuthorized: true,
        })
      )
      console.log('after setUser')
    }
  }

  return result
}

export const tokensApi = createApi({
  reducerPath: 'tokensApi',
  baseQuery: tokensApiBaseQuery,
  endpoints: builder => ({
    refreshToken: builder.query({
      query: () => ({
        url: '/refresh',
        method: 'POST',
      }),
    }),
    validateToken: builder.query({
      query: () => ({
        url: '/validate',
        method: 'GET',
      }),
    }),
  }),
})

export const { useRefreshTokenQuery, useValidateTokenQuery } = tokensApi
