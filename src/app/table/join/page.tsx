// /src/app/table/join/page.tsx

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function JoinPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [tableCode, setTableCode] = useState('')

  const handleJoin = () => {
    if (!name || !tableCode) return
    router.push(`/table/${tableCode}/claim?user=${encodeURIComponent(name)}`)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* ✅ Local Oriva logo with adjusted spacing */}
      <Image
        src="/oriva_logo_official.PNG"
        alt="Oriva logo"
        width={160}
        height={48}
        priority
        className="drop-shadow-md mb-6"
      />

      <div className="max-w-md w-full bg-[#101324] border border-[#FFD28F]/30 rounded-xl p-6 shadow-[0_0_40px_8px_rgba(255,210,143,0.2)] ring-1 ring-[#FFD28F]/30 animate-fade-in-up">
        <h1 className="text-center text-2xl md:text-3xl font-semibold text-[#FFD28F] mb-6 -mt-2">
          Join Your Table
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/80">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Taylor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#0B0F1C] border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFD28F]"
            />
          </div>

          <div>
            <label className="text-sm text-white/80">Table Code</label>
            <input
              type="text"
              placeholder="E.G. A1B2"
              value={tableCode}
              onChange={(e) => setTableCode(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#0B0F1C] border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFD28F]"
            />
          </div>

          <button
            onClick={handleJoin}
            className="w-full mt-4 rounded-full bg-[#FFCC88] text-[#0B0F1C] font-semibold py-2 transition-all duration-200 hover:bg-[#FEC56B] hover:-translate-y-1 shadow-inner animate-glow-ring"
          >
            Start Your Split
          </button>
        </div>
      </div>
    </main>
  )
}
