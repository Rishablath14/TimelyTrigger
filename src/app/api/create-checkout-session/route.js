import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req, res) {
  const {id, successUrl, cancelUrl } = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
  });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: "price_1OuAiwSByltqYxNxobdxN1u2",
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: { userId:id }, // Add user ID as metadata
      billing_address_collection: 'required',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
 
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Error creating checkout session"});
  }
}