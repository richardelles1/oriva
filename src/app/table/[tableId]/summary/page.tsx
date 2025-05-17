'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Image from 'next/image'
import Confetti from 'react-confetti'
import { Button } from '@/components/ui/button'

export default function SummaryPage() {
  const { tableId } = useParams()
  const router = useRouter()

  const [payments, setPayments] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const totalPaid = payments.reduce((sum, p) => sum + (p.amount_paid || 0), 0)
  const totalDue = items.reduce((sum, i) => sum + (i.price || 0), 0)
  const everyonePaid = totalPaid >= totalDue

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data: paymentsData } = await supabase
        .from('Payments')
        .select('*')
        .eq('table_id', tableId)

      const { data: itemsData } = await supabase
        .from('Items')
        .select('*')
        .eq('table_id', tableId)

      setPayments(paymentsData || [])
      setItems(itemsData || [])
      setLoading(false)
    }

    fetchData()
  }, [tableId])

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-sky-100 p-6 flex flex-col items-center text-center">
      {everyonePaid && <Confetti recycle={false} />}
      {everyonePaid && (
        <Image
          src="/tabitha-jump.png"
          alt="Tabitha celebrates"
          width={200}
          height={200}
          className="mt-4 animate-bounce"
        />
      )}

      <h1 className="text-3xl font-bold mt-6">💡 Table Summary</h1>
      <p className="text-md text-gray-600 mt-1">Table: <span className="font-semibold">{tableId}</span></p>

      <div className="w-full max-w-md bg-white mt-6 p-6 rounded-2xl shadow-xl">
        <div className="mb-4">
          <p className="text-lg font-semibold">
            ✅ Paid: <span className="text-green-600">${totalPaid.toFixed(2)}</span>
          </p>
          <p className="text-lg font-semibold">
            🧾 Total Due: <span className="text-blue-600">${totalDue.toFixed(2)}</span>
          </p>
        </div>

        {everyonePaid ? (
          <div className="bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm p-4 font-medium">
            🎉 All set! Everyone has paid. Let your server know you're good to go!
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-sm p-4 font-medium">
            ⏳ Still waiting on others to pay.
          </div>
        )}

        <div className="mt-6 space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex justify-between items-center bg-sky-50 px-4 py-3 rounded-xl shadow-sm border border-sky-100"
            >
              <span className="font-medium">{payment.user_name}</span>
              <span className="text-green-600 font-bold">
                ${payment.amount_paid.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        className="mt-8 text-white font-bold text-lg px-6 py-3 glow"
        onClick={() => router.push('/table/join')}
      >
        Back to Table Join
      </Button>
    </main>
  )
}
