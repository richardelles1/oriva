'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  const { tableId } = useParams()
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')

  const [items, setItems] = useState<any[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase
        .from('Items')
        .select('*')
        .eq('table_id', tableId) // Matches "AliceTestTable"
        .contains('is_selected_by', [userName]) // ✅ FIXED: handles text[] array match

      setItems(data || [])

      const total = (data || []).reduce((sum, item) => sum + (item.price || 0), 0)
      setTotalAmount(total)
    }

    if (userName) fetchItems()
  }, [tableId, userName])

  const handleStripeCheckout = async () => {
    if (!userName || totalAmount === 0) return

    setLoading(true)

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalAmount,
        tableId,
        userName,
      }),
    })

    const data = await response.json()
    if (data?.url) {
      window.location.href = data.url
    } else {
      setLoading(false)
      alert('Failed to redirect to Stripe.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-sky-100 p-6 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold mb-4">💳 Checkout</h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          {userName ? `For: ${userName}` : 'No user name found'}
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-500">No items selected.</p>
        ) : (
          <ul className="text-left space-y-2 mb-4">
            {items.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.item_name}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xl font-bold mt-4 mb-2">
          Total: ${totalAmount.toFixed(2)}
        </p>

        <Button
          className="mt-4 glow w-full font-semibold text-lg"
          onClick={handleStripeCheckout}
          disabled={loading || totalAmount === 0}
        >
          {loading ? 'Redirecting...' : 'Confirm & Pay'}
        </Button>
      </div>
    </main>
  )
}
