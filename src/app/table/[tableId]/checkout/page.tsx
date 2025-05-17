'use client'

import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'

export default function CheckoutPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const tableId = params.tableId as string
  const userName = searchParams.get('user') || 'Guest'

  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [alreadyPaid, setAlreadyPaid] = useState(false)

  useEffect(() => {
    const fetchClaimedItems = async () => {
      const { data, error } = await supabase
        .from('Items')
        .select('*')
        .eq('table_id', tableId)
        .contains('is_selected_by', [userName])

      if (error) {
        console.error('Error fetching claimed items:', error)
      } else {
        setItems(data || [])
      }

      const { data: payments } = await supabase
        .from('Payments')
        .select('*')
        .eq('table_id', tableId)
        .eq('user_name', userName)

      if (payments && payments.length > 0) {
        setAlreadyPaid(true)
      }

      setLoading(false)
    }

    fetchClaimedItems()
  }, [tableId, userName])

  const total = items.reduce((sum, item) => sum + item.price, 0)

  const handleConfirm = async () => {
    if (alreadyPaid || total === 0) return

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          tableId,
          userName,
        }),
      })

      const { url } = await res.json()
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      console.error('Stripe session error:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-6 py-16 font-sans text-gray-900">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold mb-6">💳 Checkout</h1>

        <p className="text-lg font-semibold mb-2">
          {userName ? `Welcome, ${userName}` : 'No user name found'}
        </p>

        {loading ? (
          <p className="text-gray-500">Loading your selections...</p>
        ) : alreadyPaid ? (
          <p className="text-green-600 font-medium mb-4">✅ You’ve already paid.</p>
        ) : items.length === 0 ? (
          <p className="text-gray-400 mb-6">No items selected.</p>
        ) : (
          <ul className="mb-6 text-left text-gray-800 space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.item_name}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xl font-bold mb-6">Total: ${total.toFixed(2)}</p>

        <button
          onClick={handleConfirm}
          disabled={alreadyPaid || total === 0}
          className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow hover:from-purple-700 hover:to-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✅ Confirm & Pay
        </button>
      </div>
    </main>
  )
}
