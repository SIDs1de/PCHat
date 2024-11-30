'use client'

import { SignUp as SignUpBlock } from '@/app/profile/sign-up/components/SignUp'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'motion/react'

export default function SignUp() {
  const [result, setResult] = useState<'success' | 'error' | undefined>(undefined)

  return (
    <motion.div
      exitBeforeEnter
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={clsx('pt-[45px] pb-[90px] pl-[45px] pr-[45px] duration-[0.25s] rounded-[12px]', {
          'shadow-[0px_0px_5px_1px_theme(colors.accent)]': result === 'success',
          'shadow-[0px_0px_5px_1px_theme(colors.danger)]': result === 'error',
        })}
      >
        <div className='max-w-[351px] mx-auto text-center'>
          <h1 className='text-[18px] mb-[10px]'>Зарегистрироваться</h1>
          <p className='text-[14px]'>
            Уже есть аккаунт?{' '}
            <Link
              href='/profile/sign-in'
              className='text-accent hover:text-accent-on-hover transition-all duration-[0.25s]'
            >
              Авторизуйтесь
            </Link>
          </p>
          <SignUpBlock setResult={setResult} />
        </div>
      </div>
    </motion.div>
  )
}
