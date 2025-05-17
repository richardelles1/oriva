'use client'

import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import Confetti from '@/components/ui/Confetti'
import TabithaSuccess from '@/components/ui/TabithaSuccess'

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

      // Check for existing payment
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
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-white to-green-100">
      <Confetti />
      <TabithaSuccess />

      <h1 className="text-4xl font-bold mt-4">🎉 Payment Successful!</h1>

      <p className="text-lg mt-2">
        Thanks <span className="font-semibold">{user}</span>, your payment of <span className="font-semibold">${amount.toFixed(2)}</span> has been received.
      </p>

      <p className="text-sm text-muted-foreground mt-1 max-w-sm">
        Please wait for your server to release the table once everyone has paid.
      </p>

      <Button onClick={() => router.push(`/table/${tableId}/summary`)} className="mt-6 glow">
        View Table Summary
      </Button>
    </div>
  )
}
