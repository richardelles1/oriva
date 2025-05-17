'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function JoinPage() {
  const router = useRouter()
  const [tableCode, setTableCode] = useState('table-a') // ✅ pre-filled
  const [userName, setUserName] = useState('')

  const handleJoin = () => {
    if (!tableCode || !userName) return
    router.push(`/table/${tableCode.toLowerCase()}/claim?user=${encodeURIComponent(userName)}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-rose-50 flex items-center justify-center px-6 py-16 text-gray-900 font-sans">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-4">Join a Table</h1>
        <p className="text-gray-600 mb-8">
          Enter your table code and name to view your bill and claim items.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Table Code"
            value={tableCode}
            onChange={(e) => setTableCode(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            type="text"
            placeholder="Enter Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button
            onClick={handleJoin}
            disabled={!tableCode || !userName}
            className="w-full px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🚀 Join Table
          </button>
        </div>
      </div>
    </main>
  )
}
