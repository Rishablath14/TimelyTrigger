import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY; // Set your webhook secret from Stripe

export async function POST(req, res) {
  const rawPayload = await req.text();
  const sig = headers().get('Stripe-Signature');
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
  });
  let event;

  try {
    event = stripe.webhooks.constructEvent(rawPayload, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return NextResponse.json({WebhookError:`${err.message}`});
  }

  switch (event.type) {
    case 'checkout.session.completed':
        try {
        const adminUserId = event.data.object.metadata.userId;
        const adminSubsId = Number(event.data.object.metadata.subsId);
        console.log(event.data.object);
        const res = await clerkClient.users.updateUserMetadata(
          adminUserId,
          {
            publicMetadata: {
              subscriber: true,
              subsId:adminSubsId,
              continue:false,
              isCanceled:false,
              role:"admin",      
            },
          }
        );
        console.log(res.publicMetadata);
      } catch (err) {
        console.log(err);
      }  
      break;
    case 'customer.subscription.updated':
      break;
    case 'customer.subscription.deleted':
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({message:"Successfully get the webhook request"}, { status: 200 })
}