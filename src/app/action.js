"use server"
import { auth } from "@clerk/nextjs";

export async function getauthdata(){

const {userId,sessionClaims} = auth();
    if(userId){
            if(sessionClaims.userPublicData.univerId!=="none") return true;
            }
      return false;      
    }