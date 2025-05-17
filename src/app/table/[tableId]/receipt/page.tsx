'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'

export default function ReceiptPage() {
  const { tableId } = useParams()
  const router = useRouter()

  const [items, setItems] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [timestamp, setTimestamp] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data: itemsData } = await supabase
        .from('Items')
        .select('*')
        .eq('table_id', tableId)

      const { data: paymentsData } = await supabase
        .from('Payments')
        .select('*')
        .eq('table_id', tableId)

      // FIXED: Match by table_code instead of id
      const { data: tableData } = await supabase
        .from('Tables')
        .select('created_at')
        .eq('table_code', tableId)
        .single()

      setItems(itemsData || [])
      setPayments(paymentsData || [])
      setTimestamp(tableData?.created_at || null)
      setLoading(false)
    }

    fetchData()
  }, [tableId])

  // Auto-redirect after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/table/join')
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  // Group items by user
  const itemsByUser: { [user: string]: any[] } = {}
  items.forEach((item) => {
    const user = item.is_selected_by || 'Unclaimed'
    if (!itemsByUser[user]) itemsByUser[user] = []
    itemsByUser[user].push(item)
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-sky-100 p-6 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold mb-2">🧾 Receipt</h1>
      <p className="text-md text-gray-600">
        Table: <span className="font-semibold">{tableId}</span>
      </p>
      {timestamp && (
        <p className="text-sm text-gray-500 mt-1">
          Created: {new Date(timestamp).toLocaleString()}
        </p>
      )}

      <div className="w-full max-w-xl space-y-6 mt-6">
        {Object.entries(itemsByUser).map(([user, userItems]) => {
          const userPayment = payments.find(p => p.user_name === user)
          const total = userItems.reduce((sum, i) => sum + (i.price || 0), 0)

          return (
            <div
              key={user}
              className="bg-white rounded-2xl shadow-xl p-5 border border-gray-200 text-left"
            >
              <h2 className="text-lg font-bold mb-2">
                {user === 'Unclaimed' ? '❓ Unclaimed Items' : `👤 ${user}`}
              </h2>

              <ul className="text-sm mb-3">
                {userItems.map((item) => (
                  <li key={item.id} className="flex justify-between py-1 border-b border-dashed">
                    <span>{item.item_name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              {user !== 'Unclaimed' && (
                <div className="font-semibold text-green-700">
                  Total Paid: ${userPayment?.amount_paid?.toFixed(2) || total.toFixed(2)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Button
        className="mt-10 text-white font-bold text-lg px-6 py-3 glow"
        onClick={() => router.push('/table/join')}
      >
        All Done
      </Button>
    </main>
  )
}
