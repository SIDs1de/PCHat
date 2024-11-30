import type { Metadata } from 'next'

import '@/styles/globals.scss'
import StoreProvider from '@/components/StoreProvider'
import { Montserrat } from 'next/font/google'
import clsx from 'clsx'
import Navigation from '@/components/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AnimatePresence, motion } from 'motion/react'
import AnimateWrapper from './AnimateWrapper'

export const metadata: Metadata = {
  title: 'PCHat - чат для программистов',
  description: 'PChat - чат для программистов',
}

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <html lang='ru'>
        <body className={clsx('bg-dark-1 text-white mt-[35px] font-medium tracking-[-0.01em]', montserrat.className)}>
          <div className='container max-w-[860px] mx-auto px-[10px]'>
            <header className='mb-[19px] bg-dark-2 py-[9px] px-[25px] rounded-[10px]'>
              <Navigation />
            </header>
            <AnimateWrapper>
              <main className='bg-dark-2 rounded-[12px]'>
                {children}
                <ToastContainer position='top-right' autoClose={3000} />
              </main>
            </AnimateWrapper>
          </div>
        </body>
      </html>
    </StoreProvider>
  )
}
