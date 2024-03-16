import mongoose from "mongoose";

let CachedConnection = null;

export async function connectToMongoDB(){
if(CachedConnection){
    console.log("Using Cached Connection Mongo User");
    return CachedConnection;
}
try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    CachedConnection = conn.connection;
    console.log("New Connection Mongo User");
    return CachedConnection;
}
catch(e){
console.log("Mongo Connection error");
throw e;
}
}