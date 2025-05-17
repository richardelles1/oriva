import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  
})

export async function POST(req: NextRequest) {
  const { amount, userName, tableId } = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Tabbit Bill for ${userName}`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/table/${tableId}/success?userName=${encodeURIComponent(
      userName
    )}&amount=${amount}&tableId=${tableId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/table/${tableId}/checkout`,
  })

  return NextResponse.json({ url: session.url })
}
