import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
 
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_KEY
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({error:"Error occured -- no svix headers"}, {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt = null;
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({error:'Error occured'}, {
      status: 400
    })
  }
 
  // Get the ID and type
  const { id,first_name,last_name,email_address} = evt.data;
 
  switch (evt.type) {
    case 'user.created':
          try {
            const res = await clerkClient.users.updateUser(
              id,
              {
                publicMetadata: {
                  subscriber: false,
                  subsId:null,
                  continue:false,
                  isCanceled:false,
                  univerId:"none",
                  timing:false,
                  role:"user",      
                },
              }
            );
            console.log(res.publicMetadata);
          } catch (err) {
            console.log(err);
          }  
          break;
  }
  return NextResponse.json({message:"Successfully get the webhook request"}, { status: 200 })
}
 