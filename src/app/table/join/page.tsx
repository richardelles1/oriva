'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function JoinTablePage() {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  const handleJoin = () => {
    if (code.trim() && name.trim()) {
      router.push(`/table/${code}/claim?user=${encodeURIComponent(name)}`)
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0F1C] text-white px-6 py-16 font-sans relative overflow-hidden">
      {/* ✨ Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => {
          const left = Math.floor(Math.random() * 100)
          const delay = Math.random() * 10
          const duration = 6 + Math.random() * 8
          const emoji = ['✨', '🌟', '💫', '🪄'][i % 4]
          return (
            <span
              key={i}
              className="absolute text-xl animate-float"
              style={{
                left: `${left}%`,
                bottom: `-${Math.random() * 20}vh`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            >
              {emoji}
            </span>
          )
        })}
      </div>

      {/* Logo */}
      <div className="mb-8 flex justify-center relative z-10">
        <img src="/oriva_logo_official.png" alt="Oriva Logo" className="h-20 md:h-24" />
      </div>

      {/* Hero Header */}
      <section className="relative z-10 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-semibold text-transparent bg-clip-text
                       bg-[linear-gradient(to_right,#ffffff,#fff7cc,#FFD28F,#fff7cc,#ffffff)]
                       bg-[length:200%_100%] bg-repeat animate-shimmer-strong">
          Scan & Join Your Table
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Enter your name and table code to split your bill with elegance.
        </p>
      </section>

      {/* Join Table Card */}
      <section className="relative z-10 max-w-xl mx-auto rounded-2xl bg-[#111827]/90 backdrop-blur-md border border-[#FFD28F]/60 p-6 md:p-8 ring-1 ring-[#FFD28F]/30 shadow-[0_0_40px_8px_rgba(255,210,143,0.2)] transition-all duration-300">
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 border-t border-white/20" />
          <h2 className="px-4 text-3xl font-bold text-amber-200 tracking-wide uppercase">
            Join Table
          </h2>
          <div className="flex-1 border-t border-white/20" />
        </div>

        <div className="space-y-4">
          <label className="block text-base md:text-lg font-medium text-white/80">Your Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jordan"
            className="bg-white/10 text-white placeholder-white/40 border-white/20 focus:ring-2 focus:ring-amber-300"
          />

          <label className="block text-base md:text-lg font-medium text-white/80">Table Code</label>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. A1B2C3"
            className="bg-white/10 text-white placeholder-white/40 border-white/20 focus:ring-2 focus:ring-amber-300"
          />

          <Button
            onClick={handleJoin}
            className="mt-6 w-full text-lg font-semibold rounded-xl px-6 py-3 
                       bg-[#FFCC88] hover:bg-[#FEC56B] text-black 
                       shadow-inner shadow-white/30 
                       transition-transform duration-300 ease-out
                       hover:-translate-y-1 hover:scale-[1.015]
                       focus:ring-2 focus:ring-offset-2 focus:ring-[#FFCC88]"
          >
            Enter the Flow
          </Button>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="relative z-10 max-w-2xl mx-auto mt-20 rounded-2xl bg-[#111827]/90 backdrop-blur-md border border-[#FFD28F]/60 p-6 md:p-8 ring-1 ring-[#FFD28F]/30 shadow-[0_0_40px_8px_rgba(255,210,143,0.2)] transition-all duration-300">
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 border-t border-white/20" />
          <h2 className="px-4 text-3xl font-bold text-amber-200 tracking-wide uppercase">
            Why Join?
          </h2>
          <div className="flex-1 border-t border-white/20" />
        </div>
        <div className="flex items-start gap-4 text-white">
          <Sparkles className="w-6 h-6 text-amber-300 mt-1 flex-shrink-0" />
          <p className="text-sm leading-relaxed text-white/80">
            Oriva transforms the end of your meal into a moment of ease. Skip the math, avoid the awkwardness,
            and join your friends in one elegant tap. The flow starts here.
          </p>
        </div>
      </section>
    </main>
  )
}
