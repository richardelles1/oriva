// /src/app/layout.tsx

import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Oriva',
  description: 'Effortless group dining payments — powered by Oriva',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0B0F1C] text-white font-sans`}>
        {/* 🌌 No global logo here — handled per page */}
        {children}
      </body>
    </html>
  )
}
