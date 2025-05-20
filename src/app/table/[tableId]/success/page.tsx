'use client'

import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import Image from 'next/image'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const { tableId } = useParams()
  const router = useRouter()

  const user = searchParams.get('user') || searchParams.get('name') || ''
  const amount = parseFloat(searchParams.get('amount') || '0')
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const savePayment = async () => {
      if (!user || !amount || isSaved) return

      const { data: existing } = await supabase
        .from('Payments')
        .select('*')
        .eq('table_id', tableId)
        .eq('user_name', user)

      if (!existing || existing.length === 0) {
        await supabase.from('Payments').insert([
          {
            table_id: tableId,
            user_name: user,
            amount_paid: amount,
          },
        ])
      }

      setIsSaved(true)
    }

    savePayment()
  }, [tableId, user, amount, isSaved])

  return (
    <main className="min-h-screen bg-[#0B0F1C] px-4 py-12 text-white font-sans flex flex-col items-center justify-center text-center">
      {/* Logo */}
      <div className="mb-6">
        <Image
  src="/oriva_logo_official.png"
  alt="Oriva Logo"
  width={160}
  height={160}
  className="h-20 md:h-24 object-contain"
/>

      </div>

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-serif bg-gradient-to-r from-white via-[#FFD28F] to-white bg-clip-text text-transparent animate-shimmer-strong mb-4">
        You're All Set
      </h1>

      <p className="text-lg font-serif text-white/90 mb-1">
        Thanks, <strong>{user}</strong>.
      </p>

      {/* Divider */}
      <div className="w-24 h-[1.5px] bg-[#FFD28F]/70 my-3 rounded-full" />

      <p className="text-lg font-serif text-white/90">
        Your payment of <strong>${amount.toFixed(2)}</strong> was successful.
      </p>

      {/* Receipt Info */}
      <p className="text-sm text-white/60 mt-6 max-w-sm">
        When everyone‘s paid, your server will close out the table.
        You can check the final receipt or settle up anytime.
      </p>

      <p className="text-sm text-white/50 mt-4">
        A receipt has been sent to your email by Stripe.{' '}
        <span className="underline hover:text-[#FFD28F] cursor-pointer">
          Resend receipt
        </span>{' '}
        (coming soon)
      </p>

      {/* CTA */}
      <button
        onClick={() => router.push(`/table/${tableId}/summary`)}
        className="mt-8 relative z-10 overflow-hidden rounded-full bg-[#FFCC88] px-8 py-3 text-[15px] text-[#0B0F1C] shadow-inner ring-1 ring-[#FFD28F]/60 hover:shadow-[0_0_12px_3px_rgba(255,204,136,0.4)] transition duration-300 ease-in-out font-serif btn-textured"
      >
        <span className="relative z-10">View Table Summary</span>
        <span className="absolute inset-0 animate-sparkle pointer-events-none" />
      </button>
    </main>
  )
}
