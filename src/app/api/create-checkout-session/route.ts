import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  
})

export async function POST(req: NextRequest) {
  const { amount, tableId, userName } = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Tabbit Bill for ${userName}`,
          },
          unit_amount: amount * 100, // convert to cents
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/table/${tableId}/success?amount=${amount}&user=${encodeURIComponent(userName)}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/table/${tableId}/checkout`,
  })

  return NextResponse.json({ url: session.url })
}
