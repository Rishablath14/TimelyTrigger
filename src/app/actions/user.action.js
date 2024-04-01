"use server"
import { auth } from "@clerk/nextjs";

const {userId,sessionClaims} = auth();
export const getauthdata= async () => 
{
    if(userId) if(sessionClaims?.userPublicData?.univerId!=="none") return true;
    return false;      
};

export const getsubsdata= async () => 
{
    if(userId) if(sessionClaims?.userPublicData?.subscriber) return true;
    return false;      
}

    