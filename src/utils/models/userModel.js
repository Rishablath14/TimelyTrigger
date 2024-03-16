import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName:{
         type: String,
         required:true,
        },
        role:{
         type: String,
         default:"user",
        },
        mUserId:{
            type: String,
            required:true,
            unique:true,
           },
        subsId:{
            type:Number,
            default:0,
        }, 
        isCanceled:{
            type:Boolean,
            default:false,
        },   
    },{timestamps:true,}
);

const User = mongoose.models?.User || mongoose.model("User",userSchema);

export default User;