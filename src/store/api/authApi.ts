import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: builder => ({
    signUp: builder.mutation({
      query: credentials => ({
        url: '/sign-up',
        method: 'POST',
        body: credentials,
      }),
    }),
    signIn: builder.mutation({
      query: credentials => ({
        url: '/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: refreshToken => ({
        url: '/logout',
        method: 'POST',
        headers: { 'X-Refresh-Token': refreshToken },
      }),
    }),
  }),
})

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } = authAPI
