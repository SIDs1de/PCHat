import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IAccessToken, IId, ILogOutResponse, ISignInRequest, ISignUpRequest } from '@/types'

const baseQueryUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseQueryUrl, credentials: 'include' }),
  endpoints: builder => ({
    signIn: builder.mutation<IAccessToken, ISignInRequest>({
      query: body => ({
        url: 'sign-in',
        method: 'POST',
        body,
      }),
    }),

    signUp: builder.mutation<IId, ISignUpRequest>({
      query: body => ({
        url: 'sign-up',
        method: 'POST',
        body,
      }),
    }),

    logOut: builder.mutation<ILogOutResponse, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation, useLogOutMutation } = accountApi
