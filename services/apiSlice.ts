import { RootState } from '@/store/store'
import { IUser } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQueryUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseQueryUrl}/api`,

    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).user.accessToken
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
      keepUnusedDataFor: 10 * 60,
    }),
  }),
})

export const { useValidateTokenQuery } = authApi
