import { INavItem, routes } from '@/config/routes'
import Link from 'next/link'
import logo from '@/assets/images/logo.svg'
import Image from 'next/image'

const navItems: INavItem[] = [
  { key: 'home', label: 'На главную' },
  { key: 'donate', label: 'Поддержать проект' },
  { key: 'feedback', label: 'Обратная связь' },
  { key: 'about', label: 'О проекте' },
  { key: 'profile', label: 'Профиль' },
]

const homePage = navItems.find(({ key }) => key === 'home')

export default function Navigation() {
  return (
    <nav className='flex items-center justify-between'>
      {homePage && (
        <Link
          href={routes[homePage.key]}
          className='transition-all duration-[0.25s] inline-block active:scale-[95%] active:transition-none'
        >
          <Image src={logo} alt={homePage.label} />
        </Link>
      )}
      <ul className='flex gap-[12px]'>
        {navItems.map(
          ({ key, label }) =>
            key !== 'home' && (
              <li key={key}>
                <Link
                  className='bg-dark-3 py-[6px] px-[16px] rounded-[6px] text-[14px] transition-all duration-[0.25s] inline-block active:scale-[95%] active:transition-none hover:bg-dark-5'
                  href={routes[key]}
                >
                  {label}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  )
}
