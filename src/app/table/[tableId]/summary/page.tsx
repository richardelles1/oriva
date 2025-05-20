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
  const guestCount = payments.length

  return (
    <main className="min-h-screen bg-[#0B0F1C] px-4 py-12 text-white font-sans">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/oriva_logo_official.png"
          alt="Oriva Logo"
          width={160}
          height={160}
          className="h-20 md:h-24 object-contain"
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-serif text-center mb-4 bg-gradient-to-r from-white via-[#FFD28F] to-white bg-clip-text text-transparent animate-shimmer-strong">
        Table Summary
      </h1>

      {loading ? (
        <p className="text-center text-white/70">Loading payment data...</p>
      ) : (
        <div className="max-w-xl mx-auto bg-[#111624]/70 rounded-2xl ring-1 ring-[#FFD28F]/30 shadow-[0_0_30px_6px_rgba(255,210,143,0.1)] p-6 md:p-8 backdrop-blur-md animate-fade-in-up">
          {payments.length === 0 ? (
            <p className="text-center text-white/60">No payments made yet.</p>
          ) : (
            <>
              <ul className="divide-y divide-white/10">
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
                <p className="mt-1 text-sm text-white/70 font-serif">
                  {guestCount} {guestCount === 1 ? 'person has' : 'people have'} paid.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  )
}