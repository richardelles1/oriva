'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Image from 'next/image'

interface Payment {
  user_name: string
  amount_paid: number
  timestamp: string
}

export default function SummaryPage() {
  const { tableId } = useParams()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      const { data, error } = await supabase
        .from('Payments')
        .select('*')
        .eq('table_id', tableId)
        .order('timestamp', { ascending: true })

      if (!error && data) {
        setPayments(data as Payment[])
      }
      setLoading(false)
    }

    if (tableId) fetchPayments()
  }, [tableId])

  const totalPaid = payments.reduce((sum, p) => sum + p.amount_paid, 0)
  const paidCount = payments.length

  return (
    <main className="min-h-screen bg-[#0B0F1C] px-4 py-12 text-white font-sans text-center flex flex-col items-center">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/oriva_logo_official.png"
          alt="Oriva Logo"
          width={180}
          height={180}
          className="h-24 md:h-28 object-contain"
        />
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-serif mb-4 bg-gradient-to-r from-white via-[#FFD28F] to-white bg-clip-text text-transparent animate-shimmer-strong">
        Table Summary
      </h1>

      {/* Payment Status */}
      {loading ? (
        <p className="text-white/70 mt-4">Loading payment data...</p>
      ) : payments.length === 0 ? (
        <p className="text-white/70 mt-4">No payments made yet.</p>
      ) : (
        <p className="text-[#FFD28F] font-serif text-lg mb-6">
          🎉 {paidCount} {paidCount === 1 ? 'guest has' : 'guests have'} paid. This table is complete.
        </p>
      )}

      {/* Payment Card */}
      {!loading && payments.length > 0 && (
        <div className="w-full max-w-xl bg-[#111624]/70 rounded-2xl ring-1 ring-[#FFD28F]/30 shadow-[0_0_30px_6px_rgba(255,210,143,0.1)] p-6 md:p-8 backdrop-blur-md animate-fade-in-up">
          <ul className="divide-y divide-white/10 text-left">
            {payments.map((p, i) => (
              <li key={i} className="py-3 flex justify-between text-white/90">
                <span className="font-serif">{p.user_name}</span>
                <span>${p.amount_paid.toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-white/20 text-center">
            <p className="font-serif text-lg text-white">
              Total Paid: <strong>${totalPaid.toFixed(2)}</strong>
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
