import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req,res){
    const user = await currentUser();
    const {publicMetadata} = user;
    return NextResponse.json({publicMetadata});
}