'use client'

import { useSignInMutation } from '@/services/account'
import { ISignInRequest } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import submitImg from '@/assets/images/submit.svg'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'

interface ISignInError {
  data: {
    error: string
  }
}

export const LogIn = () => {
  const [signIn, { data, isLoading, isSuccess, isError, error }] = useSignInMutation()
  const [errorText, setErrorText] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInRequest>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<ISignInRequest> = data => console.log(data)

  useEffect(() => {
    if (error) {
      if ('data' in error) {
        const TError = error as ISignInError
        setErrorText(TError.data.error)
      } else {
        console.log('error', error)
      }
    }
  }, [error])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-black flex flex-col justify-center mt-[27px]'>
      <div className='flex flex-col mb-[11px]'>
        <input
          {...register('login', { required: true })}
          placeholder='Логин'
          className={clsx(
            'mb-[5px] rounded-[6px] bg-dark-3 placeholder:text-white/70 text-white text-[14px] border-[1px] border-dark-4 py-[14px] px-[17px] transition-all duration-[0.25s] focus:border-accent',
            { 'border-danger': errors.login }
          )}
        />
        <AnimatePresence>
          {errors.login && (
            <motion.span
              className='text-danger text-[14px] text-left'
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              This field is required
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className='flex flex-col'>
        <input
          {...register('password', { required: true })}
          placeholder='Пароль'
          className={clsx(
            'mb-[5px] rounded-[6px] bg-dark-3 placeholder:text-white/70 text-white text-[14px] border-[1px] border-dark-4 py-[14px] px-[17px] transition-all duration-[0.25s] focus:border-accent',
            { 'border-danger': errors.password }
          )}
        />
        <AnimatePresence>
          {errors.password && (
            <motion.span
              className='text-danger text-[14px] text-left'
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              This field is required
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <button
        type='submit'
        className='mt-[24px] text-white text-[14px] flex items-center justify-center gap-[13px] py-[13px] px-[70px] bg-dark-4 max-w-[250px] mx-auto rounded-[6px] border-[2px] border-dark-5 hover:bg-dark-5 hover:border-dark-6 transition-all duration-[0.25s] active:scale-[0.97] active:transition-none focus:border-accent'
      >
        <span>Отправить</span>
        <Image src={submitImg} alt='Отправить' />
      </button>
    </form>
  )
}
