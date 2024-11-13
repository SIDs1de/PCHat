import type { Metadata } from 'next'

import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: 'PCHat - чат для программистов',
  description: 'PChat - чат для программистов',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body>{children}</body>
    </html>
  )
}
