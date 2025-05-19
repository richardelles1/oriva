'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import supabase from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type Item = {
  id: number
  item_name: string
  price: number
  is_selected_by: string[] | string | null
}

export default function CheckoutPage() {
  const router = useRouter()
  const { tableId } = useParams()
  const searchParams = useSearchParams()
  const userName = searchParams.get('user') || ''

  const [items, setItems] = useState<Item[]>([])
  const [isPaying, setIsPaying] = useState(false)

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from('Items')
        .select('*')
        .eq('table_id', tableId)

      if (error) {
        console.error('Error fetching items:', error)
      } else {
        setItems(data)
      }
    }

    fetchItems()
  }, [tableId])

  const filteredItems = items.filter(item => {
    try {
      const selectedBy =
        typeof item.is_selected_by === 'string'
          ? JSON.parse(item.is_selected_by)
          : item.is_selected_by || []
      return selectedBy.includes(userName)
    } catch {
      return false
    }
  })

  const total = filteredItems.reduce((sum, item) => {
    try {
      const claimedBy =
        typeof item.is_selected_by === 'string'
          ? JSON.parse(item.is_selected_by)
          : item.is_selected_by || []

      if (!Array.isArray(claimedBy) || claimedBy.length === 0) return sum

      const splitShare = item.price / claimedBy.length
      return sum + splitShare
    } catch {
      return sum
    }
  }, 0)

  const handleConfirmAndPay = async () => {
    setIsPaying(true)

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          tableId,
          userName,
        }),
      })

      const session = await res.json()
      const stripe = await stripePromise

      if (stripe && session.id) {
        await stripe.redirectToCheckout({ sessionId: session.id })
      } else {
        console.error('Stripe or session ID not available')
      }
    } catch (error) {
      console.error('Error during payment:', error)
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0F1C] px-4 py-12 text-white font-sans flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-serif mb-8 bg-gradient-to-r from-white via-[#FFD28F] to-white bg-clip-text text-transparent animate-shimmer">
  {userName}&rsquo;s Selection
</h1>


      <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_40px_8px_rgba(255,210,143,0.2)] ring-1 ring-[#FFD28F]/30 space-y-4">
        {filteredItems.length > 0 ? (
          <>
            {filteredItems.map(item => {
              let claimedBy: string[] = []
              let share = item.price

              try {
                claimedBy =
                  typeof item.is_selected_by === 'string'
                    ? JSON.parse(item.is_selected_by)
                    : item.is_selected_by || []

                if (claimedBy.length > 0) {
                  share = item.price / claimedBy.length
                }
              } catch {
                claimedBy = []
              }

              return (
                <div key={item.id} className="flex flex-col gap-1 text-white/90">
                  <div className="flex justify-between">
                    <span className="text-base font-medium">{item.item_name}</span>
                    <span className="text-base font-medium">${share.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-white/60">
                    Claimed by: {claimedBy.join(', ')}
                  </p>
                </div>
              )
            })}

            <hr className="border-t border-white/20 my-4" />

            <div className="flex justify-between font-semibold text-lg text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              onClick={handleConfirmAndPay}
              disabled={isPaying || total === 0}
              className="w-full bg-[#FFCC88] text-black text-lg hover:bg-[#FEC56B] hover:-translate-y-1 transition-all duration-300 shadow-inner"
            >
              {isPaying ? 'Processing...' : 'Confirm & Pay'}
            </Button>
          </>
        ) : (
          <p className="text-center text-white/70">
            No items selected by <strong>{userName}</strong>.
          </p>
        )}
      </div>
    </main>
  )
}
