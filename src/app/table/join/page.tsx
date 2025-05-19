'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function JoinTablePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && code) {
      router.push(`/table/${code}/claim?user=${encodeURIComponent(name)}`)
    }
  }

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const circle = document.createElement('span')
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`
    circle.classList.add('ripple')
    const ripple = button.getElementsByClassName('ripple')[0]
    if (ripple) {
      ripple.remove()
    }
    button.appendChild(circle)
  }

  return (
    <main className="min-h-screen bg-[#0B0F1C] flex flex-col items-center justify-center px-4 py-12 text-white font-sans">
      {/* Logo */}
    <Image
  src="/oriva_logo_official.png"
  alt="Oriva Logo"
  width={160}
  height={160}
  className="h-20 md:h-24 object-contain mx-auto mb-6"
/>


      {/* Hero Heading with shimmer */}
      <h1 className="text-3xl md:text-4xl font-serif mb-6 bg-gradient-to-r from-white via-[#FFD28F] to-white bg-clip-text text-transparent animate-shimmer-strong">
        Join Your Table
      </h1>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#111624] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 md:p-8 ring-1 ring-[#FFD28F]/30 shadow-[0_0_40px_8px_rgba(255,210,143,0.2)] animate-fade-in-up"
      >
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="name">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1A1F2E] text-white border border-[#FFD28F]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD28F]/40"
            required
            placeholder="e.g. Taylor"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2" htmlFor="code">
            Table Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1A1F2E] text-white border border-[#FFD28F]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD28F]/40 uppercase"
            required
            placeholder="e.g. A1B2"
          />
        </div>

        {/* CTA Button */}
    <button
  type="submit"
  onClick={handleRipple}
  className="relative z-10 w-full overflow-hidden rounded-full bg-[#FFCC88] px-6 py-3 text-base font-normal text-[#0B0F1C] shadow-inner ring-1 ring-[#FFD28F]/60 transition duration-300 ease-in-out focus:outline-none active:scale-100 btn-textured hover:shadow-[0_0_12px_3px_rgba(255,204,136,0.4)] will-change-transform"
>
  <span className="relative z-10 font-serif font-normal tracking-wide text-[15px] antialiased">
    Start Your Split
  </span>
  <span className="absolute inset-0 animate-sparkle pointer-events-none" />
</button>



      </form>
    </main>
  )
}
