'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/utils/supabase'

interface Item {
  id: number
  item_name: string
  price: number
  is_selected_by: string | null
}

export default function ClaimPage() {
  const { tableId } = useParams()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  const userName = typeof window !== 'undefined' ? localStorage.getItem('username') || 'Guest' : 'Guest'

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      const { data } = await supabase.from('Items').select('*').eq('table_id', tableId)
      setItems(data || [])
      setLoading(false)
    }

    fetchItems()
  }, [tableId])

  const handleClaim = async (itemId: number) => {
    const updated = await supabase
      .from('Items')
      .update({ is_selected_by: userName })
      .eq('id', itemId)

    if (updated.error) return

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, is_selected_by: userName } : item
      )
    )
  }

  const handleUnclaim = async (itemId: number) => {
    const updated = await supabase
      .from('Items')
      .update({ is_selected_by: null })
      .eq('id', itemId)

    if (updated.error) return

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, is_selected_by: null } : item
      )
    )
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-amber-50 via-white to-sky-100 text-center">
      <h1 className="text-3xl font-bold mb-6">🍽️ Claim Your Items</h1>

      {loading ? (
        <p className="text-lg animate-pulse">Loading menu...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item) => {
            const isClaimed = item.is_selected_by !== null
            const claimedByUser = item.is_selected_by === userName

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl shadow-md border transition-all transform hover:scale-105 cursor-pointer bg-white ${
                  isClaimed
                    ? claimedByUser
                      ? 'border-green-500 ring-2 ring-green-300'
                      : 'opacity-60 pointer-events-none'
                    : 'hover:ring-2 hover:ring-blue-300'
                }`}
                onClick={() =>
                  claimedByUser ? handleUnclaim(item.id) : handleClaim(item.id)
                }
              >
                <h3 className="text-lg font-semibold">{item.item_name}</h3>
                <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                {isClaimed && (
                  <p
                    className={`mt-2 text-sm font-medium ${
                      claimedByUser ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {claimedByUser ? '✅ Claimed by you' : `Claimed by ${item.is_selected_by}`}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
