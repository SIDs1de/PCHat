'use client'

import { useSignInMutation } from '@/services/account'
import { ISignInRequest } from '@/types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import submitImg from '@/assets/images/submit.svg'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import checkImg from '@/assets/images/check.svg'
import crossImg from '@/assets/images/cross.svg'
import checkBoldImg from '@/assets/images/check-bold.svg'
import crossBoldImg from '@/assets/images/cross-bold.svg'
import loaderImg from '@/assets/images/loader.svg'

import styles from './style.module.scss'
import { useRouter } from 'next/navigation'
import { useAccessToken, useAppDispatch } from '@/hooks/hooks'
import { setAccessToken } from '@/services/userSlice'
import { toast } from 'react-toastify'

interface ISignInError {
  data: {
    error: string
  }
}

export const LogIn = ({ setResult }) => {
  const [signIn, { data, isLoading, isSuccess, error }] = useSignInMutation()
  const [errorText, setErrorText] = useState('')
  const loadingRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState<number | null>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { setAccessToken: setAccessTokenToLocalStorage } = useAccessToken()

  useEffect(() => {
    if (isLoading && loadingRef.current) {
      setContainerHeight(loadingRef.current.offsetHeight)
    } else if (isSuccess && successRef.current) {
      setResult('success')
      setContainerHeight(successRef.current.offsetHeight)
    } else if (errorText && errorRef.current) {
      setResult('error')
      setContainerHeight(errorRef.current.offsetHeight)
    }
  }, [isLoading, isSuccess, errorText, setResult])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAccessToken({ accessToken: data.access_token }))
    }
  }, [isSuccess, data, dispatch])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ISignInRequest>({
    mode: 'all',
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Вы успешно вошли в аккаунт!')
      setAccessTokenToLocalStorage(data.access_token as string)
      router.push('/profile')
    }
  }, [isSuccess, router, data, setAccessTokenToLocalStorage])

  const loginInputValue = watch('login')
  const passwordInputValue = watch('password')

  const onSubmit: SubmitHandler<ISignInRequest> = data => {
    signIn(data)
    reset()
  }

  useEffect(() => {
    if (error) {
      if ('data' in error) {
        const TError = error as ISignInError
        console.log(TError.data.error)
        setErrorText('Указан неверный логин или пароль')
      } else {
        setErrorText('Ошибка сервера, попробуйте позже')
        console.log('error', error)
      }
    }
  }, [error])

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx('text-black flex flex-col justify-center mt-[27px] transition-all duration-[0.25s]', {
          'pointer-events-none opacity-40': isLoading,
        })}
      >
        <div className='flex flex-col mb-[11px]'>
          <span className='relative'>
            <input
              {...register('login', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 4,
                  message: 'Минимальная длина — 4 символа',
                },
                maxLength: {
                  value: 20,
                  message: 'Максимальная длина — 20 символов',
                },
              })}
              placeholder='Логин'
              className={clsx(
                'w-[100%] mb-[5px] rounded-[6px] bg-dark-3 placeholder:text-white/70 text-white text-[14px] border-[1px] py-[14px] px-[17px] transition-all duration-[0.25s]',
                styles.input,
                {
                  'border-danger focus:border-danger hover:border-danger-on-hover focus:hover:border-danger-on-hover':
                    errors.login,
                  'border-dark-4 focus:border-accent hover:border-accent-on-hover focus:hover:border-accent-on-hover':
                    !errors.login,
                }
              )}
            />

            <AnimatePresence>
              {(errors.login || loginInputValue) && (
                <motion.div
                  className='absolute top-[50%] right-[17px] origin-center w-[17px] h-[17px]'
                  initial={{ scale: 0, translateY: '-50%' }}
                  animate={{ scale: 1, translateY: '-50%' }}
                  transition={{ type: 'spring', stiffness: 450, damping: 17 }}
                >
                  {loginInputValue && !errors.login && (
                    <Image src={checkImg} alt='Правильно' className='w-[100%] h-[100%]' />
                  )}

                  {errors.login && <Image src={crossImg} alt='Неправильно' className='w-[100%] h-[100%]' />}
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          <AnimatePresence>
            {errors.login && (
              <motion.div
                className='text-danger text-[14px] text-left overflow-hidden'
                initial={{ height: 0, opacity: 0, y: 12 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
              >
                {errors.login?.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className='flex flex-col'>
          <span className='relative'>
            <input
              type='password'
              {...register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 5,
                  message: 'Минимальная длина — 5 символов',
                },
              })}
              placeholder='Пароль'
              className={clsx(
                'w-[100%] mb-[5px] rounded-[6px] bg-dark-3 placeholder:text-white/70 text-white text-[14px] border-[1px] py-[14px] px-[17px] transition-all duration-[0.25s]',
                styles.input,
                {
                  'border-danger focus:border-danger hover:border-danger-on-hover focus:hover:border-danger-on-hover':
                    errors.password,
                  'border-dark-4 focus:border-accent hover:border-accent-on-hover focus:hover:border-accent-on-hover':
                    !errors.password,
                }
              )}
            />
            <AnimatePresence>
              {(errors.password || passwordInputValue) && (
                <motion.div
                  className='absolute top-[50%] right-[17px] origin-center w-[17px] h-[17px]'
                  initial={{ scale: 0, translateY: '-50%' }}
                  animate={{ scale: 1, translateY: '-50%' }}
                  transition={{ type: 'spring', stiffness: 450, damping: 17 }}
                >
                  {passwordInputValue && !errors.password && (
                    <Image src={checkImg} alt='Правильно' className='w-[100%] h-[100%]' />
                  )}

                  {errors.password && <Image src={crossImg} alt='Неправильно' className='w-[100%] h-[100%]' />}
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          <AnimatePresence>
            {errors.password && (
              <motion.div
                className='text-danger text-[14px] text-left overflow-hidden'
                initial={{ height: 0, opacity: 0, y: 12 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
              >
                {errors.password?.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setErrorText('')}
          type='submit'
          className='mt-[24px] text-white text-[14px] flex items-center justify-center gap-[13px] py-[13px] px-[70px] bg-dark-4 max-w-[250px] mx-auto rounded-[6px] border-[2px] border-dark-5 hover:bg-dark-5 hover:border-dark-6 transition-all duration-[0.25s] active:scale-[0.97] active:transition-none focus:border-accent'
        >
          <span>Отправить</span>
          <Image src={submitImg} alt='Отправить' />
        </button>
      </form>

      <AnimatePresence>
        {(isLoading || errorText) && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: containerHeight || 'auto' }}
            transition={{ duration: 0.4 }}
            className='max-h-[83px]'
          >
            {isLoading ? (
              <motion.p
                ref={loadingRef}
                className='mt-[30px] flex justify-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Image src={loaderImg} alt='Загрузка...' />
              </motion.p>
            ) : errorText ? (
              <motion.div
                ref={errorRef}
                className='mt-[30px] flex flex-col items-center'
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Image src={crossBoldImg} alt='Неуспешный вход!' className='mb-[12px]' />
                <span className='text-[14px]'>{errorText}</span>
              </motion.div>
            ) : (
              ''
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
