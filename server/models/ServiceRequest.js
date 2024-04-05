import mongoose from 'mongoose'

const serviceRequestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    charge: { type: Number, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    status:{type:String,required:false, default:'pending'},
    acceptOn:{type:Date},
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    comments: [
        {
            content: { type: String, required: false },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModel'
            }
        },
    ],
    paymentInfo: {
        status: { type: String, default: 'pending' },
        date: { type: Date },
        payId:{type:String},
        amount:{type:Number,default:0.0}
      },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, { timestamps: true })

export default mongoose.model('ServiceRequestModel', serviceRequestSchema, 'serviceRequests');