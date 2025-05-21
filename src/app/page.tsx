'use client'
import Image from 'next/image'
import Link from 'next/link'
import { List, CheckCircle, Smartphone, Receipt } from 'lucide-react'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0E1321] text-white px-6 py-16 font-sans overflow-x-hidden">
      <div className="relative w-[260px] h-[110px] mx-auto mb-6">
        <Image src="/oriva_logo_official.png" alt="Oriva Logo" fill priority className="object-contain" />
      </div>
      <h1 className="text-center text-4xl md:text-5xl font-serif font-semibold mb-4 bg-gradient-to-r from-[#FFD27A] via-[#F5F1E6] to-[#FFD27A] text-transparent bg-clip-text animate-shimmer-strong bg-[length:200%_auto]">
        Scan & Split Your Bill
      </h1>
      <p className="text-center text-slate-100 text-base md:text-lg max-w-xl mx-auto mb-10">
        Built for large parties, designed for fun. Tap what you ate, pay what you owe – no downloads, no drama.
      </p>
      <div className="flex justify-center mt-8">
        <Link href="/table/join">
          <button className="rounded-full border border-[#FFD27A] text-[#FFD27A] hover:bg-[#FFD27A]/10 hover:shadow-[0_0_10px_#FFD27A] transition-all duration-200 font-medium px-6 py-2">
            Enter the flow
          </button>
        </Link>
      </div>
    </main>
  )
}
