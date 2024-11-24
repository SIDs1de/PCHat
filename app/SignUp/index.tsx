'use client'

import { useSignUpMutation } from '@/services/account'
import { useEffect } from 'react'

export const SignUp = () => {
  const [signUp, { data, isLoading, isSuccess }] = useSignUpMutation()

  useEffect(() => {
    signUp({ login: 'rand1', name: 'rand1', password: 'rand1' })
  }, [signUp])

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess && <div>{data.id}</div>}
    </>
  )
}
