"use server"
import { auth } from "@clerk/nextjs";

export default getauthdata = async ()=>{

const {userId} = auth();
    if(userId){
            const res = await fetch('/api/users');
            const data = await res.json();
            const ans = data.publicMetadata.univerId!=="none";
            if(ans) return true;
            }
      return false;      
    }