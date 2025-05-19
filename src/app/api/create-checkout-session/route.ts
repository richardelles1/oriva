// /src/app/api/create-checkout-session/route.ts

import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {

})

export async function POST(req: Request) {
  const { amount, tableId, userName } = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: `Oriva Payment – ${userName}` },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/table/${tableId}/success?user=${userName}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/table/${tableId}/checkout?user=${userName}`,
    metadata: { tableId, userName },
  })

  return NextResponse.json({ id: session.id })
}
