'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

type Item = {
  id: number
  item_name: string
  price: number
  is_selected_by: string[] | null
}

export default function ClaimPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const tableId = params.tableId as string
  const user = searchParams.get('user') || 'Guest'

  const [items, setItems] = useState<Item[]>([])
  const [claimedItems, setClaimedItems] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('Items')
        .select('*')
        .eq('table_id', tableId)

      if (error) {
        console.error('Error fetching items:', error)
      } else {
        setItems(data as Item[])

        // mark any items this user already claimed
        const myClaims = data
          .filter((item: Item) => item.is_selected_by?.includes(user))
          .map((item: Item) => item.id)

        setClaimedItems(myClaims)
      }

      setLoading(false)
    }

    fetchItems()
  }, [tableId, user])

  const toggleClaim = async (item: Item) => {
    const isClaimed = claimedItems.includes(item.id)
    const newClaimList = isClaimed
      ? item.is_selected_by?.filter((u) => u !== user) || []
      : [...(item.is_selected_by || []), user]

    const { error } = await supabase
      .from('Items')
      .update({ is_selected_by: newClaimList })
      .eq('id', item.id)

    if (error) {
      console.error('Failed to update item:', error)
    } else {
      setClaimedItems((prev) =>
        isClaimed ? prev.filter((id) => id !== item.id) : [...prev, item.id]
      )
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, is_selected_by: newClaimList } : i
        )
      )
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-6 py-16 text-gray-900 font-sans">
      <h1 className="text-3xl font-extrabold text-center mb-10">🍽️ Select Your Dishes</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No items found for this table.</p>
      ) : (
        <>
          <ul className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-6">
            {items.map((item) => {
              const isClaimed = claimedItems.includes(item.id)
              return (
                <li
                  key={item.id}
                  onClick={() => toggleClaim(item)}
                  className={`cursor-pointer bg-white p-5 rounded-2xl border transition duration-300 ${
                    isClaimed
                      ? 'border-purple-500 bg-purple-50 shadow-lg scale-[1.02]'
                      : 'border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-semibold text-lg ${
                        isClaimed ? 'text-purple-600' : 'text-gray-900'
                      }`}
                    >
                      {item.item_name}
                    </span>
                    <span className="text-gray-500">${item.price.toFixed(2)}</span>
                  </div>
                </li>
              )
            })}
          </ul>

          {claimedItems.length > 0 && (
            <div className="mt-12 text-center">
              <div className="relative flex justify-center">
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                  <div className="animate-pulse w-40 h-40 rounded-full bg-purple-300 opacity-20 blur-2xl" />
                </div>

                <button
                  onClick={() =>
                    router.push(`/table/${tableId}/checkout?user=${encodeURIComponent(user)}`)
                  }
                  className="relative z-10 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-lg transform hover:scale-105 transition duration-300"
                >
                  ✅ Continue to Checkout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
