'use client'

import { useValidateTokenQuery } from '@/services/apiSlice'
import Image from 'next/image'
import { useEffect } from 'react'
import outImg from '@/assets/images/out.svg'
import { useAccessToken } from '@/hooks/hooks'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/utils/auth'
import { toast } from 'react-toastify'

export default function Profile() {
  const { setAccessToken, accessToken } = useAccessToken()
  const router = useRouter()
  const { data, refetch, isError } = useValidateTokenQuery(undefined, {
    skip: !getAccessToken(),
  })

  useEffect(() => {
    if (!accessToken) {
      toast.success('Вы успешно вышли из аккаунта!')
      router.push('/profile/sign-in')
    }
  }, [isError, router, accessToken])

  useEffect(() => {
    if (accessToken) {
      refetch()
    }
  }, [accessToken, refetch])

  return (
    <>
      <div className='pt-[45px] pb-[84px] px-[75px] flex gap-[35px]'>
        <div>
          <span className='block h-[60px] w-[60px] bg-dark-6 rounded-[6px]'></span>
        </div>
        <div>
          <div className='mb-[14px] text-[18px]'>ID: {data?.id}</div>
          <div className='mb-[14px] text-[18px]'>Имя: {data?.name}</div>
          <div className='mb-[14px] text-[18px]'>Логин: {data?.login}</div>
          <button
            onClick={() => {
              setAccessToken(null)
              refetch()
            }}
            className='mt-[24px] text-white text-[14px] flex items-center justify-center gap-[13px] py-[13px] px-[85px] bg-dark-4 max-w-[250px] mx-auto rounded-[6px] border-[2px] border-dark-5 hover:bg-dark-5 hover:border-dark-6 transition-all duration-[0.25s] active:scale-[0.97] active:transition-none focus:border-accent'
          >
            <span>Выйти</span>
            <Image src={outImg} alt='Выйти' />
          </button>
        </div>
      </div>
    </>
  )
}
