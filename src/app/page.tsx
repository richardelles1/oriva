'use client'

import Image from 'next/image'
import Link from 'next/link'
import { List, CheckCircle, Smartphone, Receipt } from 'lucide-react'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0E1321] text-white px-6 py-16 font-sans overflow-x-hidden">
      {/* Logo */}
      <div className="relative w-[260px] h-[110px] mx-auto mb-6">
        <Image
          src="/oriva_logo_official.png"
          alt="Oriva Logo"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Animated Hero Header */}
      <h1 className="text-center text-4xl md:text-5xl font-serif font-semibold mb-4 bg-gradient-to-r from-[#FFD27A] via-[#F5F1E6] to-[#FFD27A] text-transparent bg-clip-text animate-shimmer bg-[length:200%_auto]">
        Scan & Split Your Bill
      </h1>

      {/* Subheadline */}
      <p className="text-center text-slate-100 text-base md:text-lg max-w-xl mx-auto mb-10">
        Built for large parties, designed for fun. Tap what you ate, pay what you owe – no downloads, no drama.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
        {[
          {
            icon: <List className="text-[#FFD27A] w-6 h-6 flex-shrink-0" />,
            title: 'Item-by-item Claims',
            description:
              'See your items. Tap to claim. Fair and visual for everyone.',
          },
          {
            icon: <CheckCircle className="text-[#FFD27A] w-6 h-6 flex-shrink-0" />,
            title: 'Fast & Fair Checkout',
            description:
              'Settle up instantly. No awkward convos. No waiting.',
          },
          {
            icon: <Smartphone className="text-[#FFD27A] w-6 h-6 flex-shrink-0" />,
            title: 'No App Download Needed',
            description:
              'Just scan, tap, and pay. It all works from the web.',
          },
          {
            icon: <Receipt className="text-[#FFD27A] w-6 h-6 flex-shrink-0" />,
            title: 'Receipts for Everyone',
            description:
              'Every diner gets a receipt — email, text, or save it.',
          },
        ].map((card, index) => (
          <div
            key={index}
            className="relative rounded-[1.5rem] bg-gradient-to-br from-[#131A2A] via-[#0E1321] to-[#0E1321] backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(255,210,122,0.07)] hover:shadow-[0_8px_40px_rgba(255,210,122,0.15)] p-6 transition-all duration-300 ease-in-out hover:scale-[1.015] overflow-hidden"
          >
            <div className="absolute inset-0 before:absolute before:inset-0 before:bg-white/5 before:backdrop-blur-[2px] before:opacity-0 hover:before:opacity-10 before:transition-opacity rounded-[1.5rem]" />
            <div className="relative z-10 flex gap-4 items-start text-left">
              {card.icon}
              <div>
                <h3 className="text-[#FFD27A] font-semibold text-lg mb-1">{card.title}</h3>
                <p className="text-slate-100 text-[15px] text-justify leading-snug">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="relative max-w-xl mx-auto mb-10">
        {/* Floating Header */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0E1321] px-4 font-serif text-[#FFD27A] text-xl font-semibold z-10">
          How It Works
        </div>

        <div className="relative rounded-2xl bg-gradient-to-br from-[#131A2A] via-[#0E1321] to-[#0E1321] backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(255,210,122,0.07)] p-6 pt-10 overflow-hidden">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-white/5 before:backdrop-blur-[2px] before:opacity-0 hover:before:opacity-10 before:transition-opacity rounded-2xl" />
          <div className="relative z-10">
            <ol className="space-y-4 text-[16px] text-slate-100 leading-relaxed text-justify">
              {[
                'Scan your table’s QR code to open Oriva.',
                'Tap your dishes. Add a name or email avatar.',
                'Pay your share. Get a receipt. You’re done.',
              ].map((step, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 inline-block w-6 h-6 rounded-full bg-[#FFD27A] text-[#0E1321] font-bold text-sm text-center leading-6">
                    {i + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                </li>
              ))}
            </ol>

            {/* CTA Button */}
            <div className="flex justify-center mt-8">
              <Link href="/table/join">
                <button className="rounded-full border border-[#FFD27A] text-[#FFD27A] hover:bg-[#FFD27A]/10 hover:shadow-[0_0_10px_#FFD27A] transition-all duration-200 font-medium px-6 py-2">
                  Enter the flow
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
