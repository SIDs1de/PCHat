import { IUser } from '@/types'
import { getAccessToken } from '@/utils/auth'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQueryUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseQueryUrl}/api`,

    prepareHeaders: headers => {
      const accessToken = getAccessToken()
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }
      return headers
    },

    credentials: 'include',
  }),

  endpoints: builder => ({
    validateToken: builder.query<Omit<IUser, 'accessToken'>, void>({
      query: () => '/validate',
    }),
  }),
})

export const { useValidateTokenQuery } = authApi
