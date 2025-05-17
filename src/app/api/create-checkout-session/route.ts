import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil' as const,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { amount, tableId, userName } = body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `Payment by ${userName} for Table ${tableId}` },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/table/${tableId}/success?user=${encodeURIComponent(userName)}&amount=${amount}`,

      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/table/${tableId}/checkout?user=${userName}`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error('Stripe Error:', err)
    return NextResponse.json({ error: 'Stripe session failed' }, { status: 500 })
  }
}
