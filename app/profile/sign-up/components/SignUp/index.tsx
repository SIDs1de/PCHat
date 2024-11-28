'use client'

import { useSignUpMutation } from '@/services/account'
import { ISignUpRequest } from '@/types'
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

interface ISignUpError {
  data: {
    error: string
  }
}

interface ISignUpRequestExtended extends ISignUpRequest {
  repeatedPassword: string
}

export const SignUp = ({ setResult }) => {
  const [signUp, { data, isLoading, isSuccess, isError, error }] = useSignUpMutation()
  const [errorText, setErrorText] = useState('')
  const loadingRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState<number | null>(null)
  const router = useRouter()

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    trigger,
    getValues,
  } = useForm<ISignUpRequestExtended>({
    mode: 'all',
  })

  const loginInputValue = watch('login')
  const nameInputValue = watch('name')
  const passwordInputValue = watch('password')
  const repeatedPasswordInputValue = watch('repeatedPassword')

  const onSubmit: SubmitHandler<ISignUpRequestExtended> = data => {
    signUp(data)
    reset()
  }

  useEffect(() => {
    let timeoutId
    if (isSuccess) {
      timeoutId = setTimeout(() => {
        router.push('/profile/sign-in')
      }, 3000)
    }

    return () => clearTimeout(timeoutId)
  }, [isSuccess, router])

  useEffect(() => {
    if (error) {
      if ('data' in error) {
        const TError = error as ISignUpError
        console.log(TError.data.error)
        setErrorText('Ошибка в заполнении формы (возможно, логин уже занят)')
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
              {...register('name', {
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
              placeholder='Имя'
              className={clsx(
                'w-[100%] mb-[5px] rounded-[6px] bg-dark-3 placeholder:text-white/70 text-white text-[14px] border-[1px] py-[14px] px-[17px] transition-all duration-[0.25s]',
                styles.input,
                {
                  'border-danger focus:border-danger hover:border-danger-on-hover focus:hover:border-danger-on-hover':
                    errors.name,
                  'border-dark-4 focus:border-accent hover:border-accent-on-hover focus:hover:border-accent-on-hover':
                    !errors.name,
                }
              )}
            />

            <AnimatePresence>
              {(errors.name || nameInputValue) && (
                <motion.div
                  className='absolute top-[50%] right-[17px] origin-center w-[17px] h-[17px]'
                  initial={{ scale: 0, translateY: '-50%' }}
                  animate={{ scale: 1, translateY: '-50%' }}
                  transition={{ type: 'spring', stiffness: 450, damping: 17 }}
                >
                  {nameInputValue && !errors.name && (
                    <Image src={checkImg} alt='Правильно' className='w-[100%] h-[100%]' />
                  )}

                  {errors.name && <Image src={crossImg} alt='Неправильно' className='w-[100%] h-[100%]' />}
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          <AnimatePresence>
            {errors.name && (
              <motion.div
                className='text-danger text-[14px] text-left overflow-hidden'
                initial={{ height: 0, opacity: 0, y: 12 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
              >
                {errors.name?.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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

        <div className='flex flex-col mb-[11px]'>
          <span className='relative'>
            <input
              type='password'
              {...register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 5,
                  message: 'Минимальная длина — 5 символов',
                },
                onChange: () => trigger('repeatedPassword'),
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

        <div className='flex flex-col'>
          <span className='relative'>
            <input
              type='password'
              {...register('repeatedPassword', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 5,
                  message: 'Минимальная длина — 5 символов',
                },
                validate: (val: string) => {
                  if (getValues('password') != val) {
                    return 'Пароли не совпадают'
                  }
                },
              })}
              placeholder='Повторите пароль'
              className={clsx(
                'w-[100%] mb-[5px] rounded-[6px] bg-dark-3 placeholder:text-white/70 text-white text-[14px] border-[1px] py-[14px] px-[17px] transition-all duration-[0.25s]',
                styles.input,
                {
                  'border-danger focus:border-danger hover:border-danger-on-hover focus:hover:border-danger-on-hover':
                    errors.repeatedPassword,
                  'border-dark-4 focus:border-accent hover:border-accent-on-hover focus:hover:border-accent-on-hover':
                    !errors.repeatedPassword,
                }
              )}
            />
            <AnimatePresence>
              {(errors.repeatedPassword || repeatedPasswordInputValue) && (
                <motion.div
                  className='absolute top-[50%] right-[17px] origin-center w-[17px] h-[17px]'
                  initial={{ scale: 0, translateY: '-50%' }}
                  animate={{ scale: 1, translateY: '-50%' }}
                  transition={{ type: 'spring', stiffness: 450, damping: 17 }}
                >
                  {repeatedPasswordInputValue && !errors.repeatedPassword && (
                    <Image src={checkImg} alt='Правильно' className='w-[100%] h-[100%]' />
                  )}

                  {errors.repeatedPassword && <Image src={crossImg} alt='Неправильно' className='w-[100%] h-[100%]' />}
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          <AnimatePresence>
            {errors.repeatedPassword && (
              <motion.div
                className='text-danger text-[14px] text-left overflow-hidden'
                initial={{ height: 0, opacity: 0, y: 12 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
              >
                {errors.repeatedPassword?.message}
              </motion.div>
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

      <AnimatePresence>
        {(isLoading || isSuccess || errorText) && (
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
            ) : isSuccess ? (
              <motion.div
                ref={successRef}
                className='mt-[30px] flex flex-col items-center'
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Image src={checkBoldImg} alt='Успешная регистрация!' className='mb-[12px]' />
                <span className='text-[14px]'>Аккаунт успешно зарегистрирован!</span>
                <span className='text-[14px]'>Ваш id: {data.id}</span>
              </motion.div>
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
