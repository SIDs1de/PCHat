'use client'

import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function AnimateWrapper({ children }) {
  return <AnimatePresence mode='wait'>{children}</AnimatePresence>
}
