'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Image from 'next/image'

// ------------------------------
// Types
// ------------------------------
type Item = {
  id: number
  item_name: string
  price: number
  is_selected_by: string[] | null
}

// ------------------------------
// Claim Page Component
// ------------------------------
export default function ClaimPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const tableId = params.tableId as string
  const user = searchParams.get('user') || 'Guest'

  const [items, setItems] = useState<Item[]>([])
  const [claimedItems, setClaimedItems] = useState<number[]>([])
  const [evenSplitCount, setEvenSplitCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // ------------------------------
  // Fetch items from Supabase
  // ------------------------------
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

        const myClaims = data
          .filter((item: Item) => item.is_selected_by?.includes(user))
          .map((item: Item) => item.id)

        setClaimedItems(myClaims)
      }

      setLoading(false)
    }

    fetchItems()
  }, [tableId, user])

  // ------------------------------
  // Toggle Claim Logic
  // ------------------------------
  const toggleClaim = async (item: Item) => {
    if (evenSplitCount !== null) return // disable claim if even split active

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

  // ------------------------------
  // Handle Even Split Activation
  // ------------------------------
  const handleEvenSplit = () => {
    if (evenSplitCount !== null) {
      setEvenSplitCount(null) // allow toggling off
    } else {
      const input = prompt('How many people are splitting the bill evenly?')
      const count = input ? parseInt(input) : null
      if (count && count > 1) {
        setEvenSplitCount(count)
        console.log(`Even split set for ${count} people.`)
      }
    }
  }

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <main className="min-h-screen bg-[#0B0F1C] px-4 py-12 text-white font-sans pb-32">
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

      {/* Shimmering Header */}
      <h1 className="text-3xl md:text-4xl font-serif text-center mb-8 bg-gradient-to-r from-white via-[#FFD28F] to-white bg-clip-text text-transparent animate-shimmer-strong">
        Select Your Dishes
      </h1>

      {/* Item Grid */}
      {loading ? (
        <p className="text-center text-white/60">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-white/50">No items found for this table.</p>
      ) : (
        <ul className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {/* Even Split Card */}
          <li
            onClick={handleEvenSplit}
            className={`cursor-pointer col-span-full py-7 px-6 rounded-2xl text-center font-serif text-xl font-semibold transition-all duration-300 ease-in-out ${
              evenSplitCount !== null
                ? 'bg-[#FFD28F]/95 text-[#0B0F1C] ring-2 ring-[#FFD28F] shadow-[0_0_20px_6px_rgba(255,210,143,0.4)]'
                : 'bg-[#111624]/70 text-white ring-1 ring-[#FFD28F]/30 hover:shadow-[0_0_12px_3px_rgba(255,204,136,0.4)]'
            } animate-fade-in-up`}
          >
            {evenSplitCount !== null ? 'Even Split Active — Tap to Cancel' : 'Split Everything Evenly'}
          </li>

          {/* Item Cards */}
          {items.map((item) => {
            const isClaimed = claimedItems.includes(item.id)
            return (
              <li
                key={item.id}
                onClick={() => toggleClaim(item)}
                className={`cursor-pointer p-5 rounded-2xl transition-all duration-300 ease-in-out backdrop-blur-md ring-1 ring-[#FFD28F]/30 shadow-[0_0_30px_6px_rgba(255,210,143,0.15)] ${
                  isClaimed ? 'bg-[#FFD28F]/90 text-[#0B0F1C]' : 'bg-[#111624]/70 text-white'
                } hover:shadow-[0_0_12px_3px_rgba(255,204,136,0.4)] animate-fade-in-up ${
                  evenSplitCount !== null ? 'pointer-events-none opacity-40' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-serif font-semibold text-lg">
                    {item.item_name}
                  </span>
                  <span className="text-sm">${item.price.toFixed(2)}</span>
                </div>
                {item.is_selected_by && item.is_selected_by.length > 0 && (
                  <p className={`text-xs font-serif mt-1 ${
                    isClaimed ? 'text-[#3C2F1B]/80' : 'text-white/60'
                  }`}>
                    Claimed by: {item.is_selected_by.join(', ')}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      )}

      {/* Even Split Status */}
      {evenSplitCount !== null && (
        <p className="text-center mt-12 mb-4 text-white font-serif text-lg">
          Even split is active for <strong>{evenSplitCount}</strong> people.
        </p>
      )}

      {/* CTA Button */}
      {((claimedItems.length > 0 && evenSplitCount === null) || evenSplitCount !== null) && (
        <div className="fixed bottom-6 inset-x-0 flex justify-center">
          <button
            onClick={() =>
              router.push(
                `/table/${tableId}/checkout?user=${encodeURIComponent(user)}`
              )
            }
            className="relative z-10 overflow-hidden rounded-full bg-[#FFCC88] px-8 py-3 text-[16px] font-normal text-[#0B0F1C] shadow-inner ring-1 ring-[#FFD28F]/60 transition duration-300 ease-in-out hover:shadow-[0_0_12px_3px_rgba(255,204,136,0.4)] will-change-transform btn-textured"
          >
            <span className="relative z-10 font-serif font-normal tracking-wide antialiased">
              {evenSplitCount !== null ? 'Looks Good — Let’s Pay' : 'Continue to Checkout'}
            </span>
            <span className="absolute inset-0 animate-sparkle pointer-events-none" />
          </button>
        </div>
      )}
    </main>
  )
}