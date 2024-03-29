import { clerkClient, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req,res){
    const user = await currentUser();
    const {publicMetadata} = user;
    return NextResponse.json({publicMetadata});
}
export async function POST(req,res){
    const reqs = await req.json();
    const {univerId} = reqs;
    console.log(univerId);
    const user = await currentUser();
    const {id} = user;
try{
    await clerkClient.users.updateUserMetadata(
        id,
        {
            publicMetadata: {
                univerId
            },
        })
    return NextResponse.json({message:"success"},{ status: 200 }); 
    }
catch(e){return NextResponse.json({message:"Failed"},{ status: 500 });}    
}