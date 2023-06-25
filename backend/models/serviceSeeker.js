import { number } from "joi";
import mongoose from "mongoose";

const serviceSeekerSchema=new mongoose.Schema({
    title:{type:String,required:true},
    address:{type:String,required:true},
    charge:{type:Number, required:true},
    skills:{type:String, required:false},
    experience:{type:String,required:false},
    duration:{type:String,required:true},
    email:{type:String,required:false},
    cv:{type:String,required:false},
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
    rating:{type:Number, default:3},
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
        }
    ],
},{timestamps:true})
export default mongoose.model('ServiceSeekerModel',serviceSeekerSchema,'serviceseekers');