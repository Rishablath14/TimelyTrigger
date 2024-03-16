import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
 
export default async function getSession() {
  const { sessionClaims } = await auth();
 
  const userRole = await sessionClaims?.role;
  console.log(userRole);
 
  return NextResponse.json({role:userRole });
}