'use client'

import { LogIn } from '@/app/profile/sign-in/components/LogIn'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

export default function SignIn() {
  const [result, setResult] = useState<'success' | 'error' | undefined>(undefined)

  return (
    <div
      className={clsx('pt-[45px] pb-[90px] pl-[45px] pr-[45px] duration-[0.25s] rounded-[12px]', {
        'shadow-[0px_0px_5px_1px_theme(colors.accent)]': result === 'success',
        'shadow-[0px_0px_5px_1px_theme(colors.danger)]': result === 'error',
      })}
    >
      <div className='max-w-[351px] mx-auto text-center'>
        <h1 className='text-[18px] mb-[10px]'>Авторизоваться</h1>
        <p className='text-[14px]'>
          Ещё нет аккаунта?{' '}
          <Link href='/' className='text-accent hover:text-accent-on-hover transition-all duration-[0.25s]'>
            Зарегистрируйтесь
          </Link>
        </p>
        <LogIn setResult={setResult} />
      </div>
    </div>
  )
}
