import { LogIn } from '@/app/profile/sign-in/components/LogIn'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div className='pt-[45px] pb-[90px] pl-[45px] pr-[45px]'>
      <div className='max-w-[351px] mx-auto text-center'>
        <h1 className='text-[18px] mb-[10px]'>Авторизоваться</h1>
        <p className='text-[14px]'>
          Ещё нет аккаунта? <Link href="/" className='text-accent hover:text-accent-on-hover transition-all duration-[0.25s]'>Зарегистрируйтесь</Link>
        </p>
        <LogIn />
      </div>
    </div>
  )
}
