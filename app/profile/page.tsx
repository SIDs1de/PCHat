'use client'

import { useLogOutMutation } from '@/services/account'
import { useValidateTokenQuery } from '@/services/apiSlice'
import { useEffect } from 'react'

export default function Profile() {
  const { data, isLoading, isError } = useValidateTokenQuery()
  const [logOut] = useLogOutMutation()

  useEffect(() => {
    console.log(data)
  }, [data, isLoading, isError])

  return (
    <>
      <div>Профиль</div>
      <button onClick={() => logOut()}>Выйти из аккаунта</button>
    </>
  )
}
