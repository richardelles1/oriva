'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import supabase from '@/utils/supabase/client'

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
  const [tipPercent, setTipPercent] = useState<number>(18)
  const [customInput, setCustomInput] = useState('')
  const [customMode, setCustomMode] = useState(false)

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

  const filteredItems = items.filter((item) => {
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

  const subtotal = filteredItems.reduce((sum, item) => {
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

  const tipAmount = subtotal * (tipPercent / 100)
  const grandTotal = subtotal + tipAmount

  const handleConfirmAndPay = async () => {
    setIsPaying(true)

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
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

  const handleCustomSubmit = () => {
    const value = parseFloat(customInput)
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setTipPercent(value)
      setCustomMode(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0F1C] px-4 py-12 text-white font-sans flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-serif mb-8 bg-gradient-to-r from-white via-[#FFD28F] to-white bg-clip-text text-transparent animate-shimmer-strong">
        {userName}&rsquo;s Selection
      </h1>

      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_40px_8px_rgba(255,210,143,0.2)] ring-1 ring-[#FFD28F]/30 space-y-4 animate-fade-in-up">
        {filteredItems.length > 0 ? (
          <>
            {filteredItems.map((item) => {
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
                  <div className="flex justify-between font-serif text-[17px]">
                    <span>{item.item_name}</span>
                    <span>${share.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-white/60 font-serif italic">
                    Claimed by: {claimedBy.join(', ')}
                  </p>
                </div>
              )
            })}

            <hr className="border-t border-white/10 my-4" />

            {/* Subtotal */}
            <div className="flex justify-between font-serif text-lg text-white">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Tip Selector */}
            <div className="space-y-2">
              <p className="text-sm text-white/60 font-serif">Choose a Tip</p>
              <div className="flex flex-wrap gap-2">
                {[15, 18, 20, 25].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => {
                      setTipPercent(percent)
                      setCustomMode(false)
                    }}
                    className={`px-4 py-2 rounded-full font-serif text-sm transition-all ${
                      tipPercent === percent && !customMode
                        ? 'bg-[#FFD28F] text-[#0B0F1C] shadow-md ring-2 ring-[#FFD28F]'
                        : 'bg-white/10 text-white/80 hover:bg-[#FFD28F]/10'
                    }`}
                  >
                    {percent}%
                  </button>
                ))}

                {/* Custom Button */}
                <button
                  onClick={() => setCustomMode(true)}
                  className={`px-4 py-2 rounded-full font-serif text-sm transition-all ${
                    customMode
                      ? 'bg-[#FFD28F] text-[#0B0F1C] shadow-md ring-2 ring-[#FFD28F]'
                      : 'bg-white/10 text-white/80 hover:bg-[#FFD28F]/10'
                  }`}
                >
                  Custom
                </button>

                {/* No Tip */}
                <button
                  onClick={() => {
                    setTipPercent(0)
                    setCustomMode(false)
                  }}
                  className={`px-4 py-2 rounded-full font-serif text-sm transition-all ${
                    tipPercent === 0 && !customMode
                      ? 'bg-[#FFD28F] text-[#0B0F1C] shadow-md ring-2 ring-[#FFD28F]'
                      : 'bg-white/10 text-white/80 hover:bg-[#FFD28F]/10'
                  }`}
                >
                  No Tip
                </button>
              </div>

              {/* Custom Input */}
              {customMode && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="number"
                    placeholder="Enter %"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-24 px-3 py-1 rounded-md bg-[#0B0F1C] border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD28F]"
                  />
                  <button
                    onClick={handleCustomSubmit}
                    className="px-3 py-1 rounded-md bg-[#FFD28F] text-[#0B0F1C] text-sm font-semibold hover:bg-[#FEC56B]"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Tip + Total */}
            <div className="flex justify-between font-serif text-base text-white/80 mt-2">
              <span>Tip</span>
              <span>${tipAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-serif text-lg text-white">
              <span>Total</span>
              <span className="text-[#FFD28F] font-semibold">${grandTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleConfirmAndPay}
              disabled={isPaying || grandTotal === 0}
              className="w-full rounded-full bg-[#FFCC88] text-[#0B0F1C] font-serif text-lg font-medium py-3 shadow-inner transition-all duration-300 hover:bg-[#FEC56B] hover:-translate-y-1"
            >
              {isPaying ? 'Processing...' : 'Confirm & Pay'}
            </button>
          </>
        ) : (
          <p className="text-center text-white/70 font-serif italic">
            No items selected by <strong>{userName}</strong>.
          </p>
        )}
      </div>
    </main>
  )
}
