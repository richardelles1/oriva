import Stripe from 'stripe'
import { NextRequest } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {

})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { amount, tableId, userName } = body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Oriva Payment for ${userName}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/table/${tableId}/success?user=${encodeURIComponent(
        userName
      )}&amount=${amount}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/table/${tableId}/checkout?user=${encodeURIComponent(
        userName
      )}`,
    })

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
    })
  } catch (err) {
    console.error('Stripe Error:', err)
    return new Response(
      JSON.stringify({ error: 'Stripe session creation failed' }),
      { status: 500 }
    )
  }
}
