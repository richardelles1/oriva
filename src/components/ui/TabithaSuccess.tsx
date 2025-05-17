'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function TabithaSuccess() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.3 }}
      className="w-64 h-64 mt-6" // Doubled from w-32 h-32
    >
      <Image
        src="/tabitha_jump.png"
        alt="Tabitha Rabbit celebrating"
        width={256} // was 128
        height={256} // was 128
        className="mx-auto"
        priority
      />
    </motion.div>
  )
}
