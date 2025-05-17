'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'

export default function SummaryPage() {
  const params = useParams()
  const router = useRouter()

  const tableId = params.tableId as string

  const [payments, setPayments] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: itemsData, error: itemsError } = await supabase
        .from('Items')
        .select('*')
        .eq('table_id', tableId)

      const { data: paymentsData, error: paymentsError } = await supabase
        .from('Payments')
        .select('*')
        .eq('table_id', tableId)

      if (itemsError || paymentsError) {
        console.error('Fetch error:', itemsError || paymentsError)
      } else {
        setItems(itemsData || [])
        setPayments(paymentsData || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [tableId])

  const grandTotal = items.reduce((sum, item) => sum + item.price, 0)
  const paidTotal = payments.reduce((sum, p) => sum + p.amount_paid, 0)
  const fullyPaid = grandTotal > 0 && paidTotal >= grandTotal

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-6 py-16 font-sans text-gray-900">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold mb-6">📋 Table Summary</h1>

        {loading ? (
          <p className="text-gray-500">Loading summary...</p>
        ) : (
          <>
            <ul className="mb-6 text-left text-gray-800 space-y-2">
              {payments.map((p, i) => (
                <li key={i} className="flex justify-between">
                  <span>{p.user_name}</span>
                  <span>${p.amount_paid.toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg font-semibold mb-2">
              Total Paid: ${paidTotal.toFixed(2)} / ${grandTotal.toFixed(2)}
            </p>

            {fullyPaid ? (
              <div className="text-green-600 font-bold mb-4">🎉 All payments complete!</div>
            ) : (
              <div className="text-yellow-600 mb-4">⏳ Waiting on remaining guests...</div>
            )}

            <p className="text-sm text-gray-500 mb-8">
              Your server will close the table once all guests have paid.
            </p>

            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow transition"
            >
              🏠 Return Home
            </button>
          </>
        )}
      </div>
    </main>
  )
}
