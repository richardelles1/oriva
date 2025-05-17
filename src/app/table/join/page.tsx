'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function JoinPage() {
  const [code, setCode] = useState('')
  const router = useRouter()

  const handleJoin = () => {
    if (code.trim() !== '') {
      router.push(`/table/${code}/claim`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-pink-50 relative overflow-hidden text-center px-4">
      {/* Floating emoji background */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float drop-shadow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * -100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {['🍽️', '💸', '🎉', '🧾'][i % 4]}
          </div>
        ))}
      </div>

      <div className="z-10 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Join a Table</h1>
        <p className="text-gray-600 mb-8">Enter your table code below to view your bill and claim items.</p>

        <input
          type="text"
          placeholder="Enter Table Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full text-center text-lg px-6 py-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all mb-6"
        />

        <div className="relative group w-full">
          <div className="absolute inset-0 rounded-xl blur-md opacity-70 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 group-hover:animate-pulse transition-all"></div>
          <button
            onClick={handleJoin}
            className="relative z-10 w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all animate-ring"
          >
            🚀 Join Table
          </button>
        </div>
      </div>
    </div>
  )
}
