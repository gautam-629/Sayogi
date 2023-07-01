import mongoose from 'mongoose'

const serviceRequestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    charge: { type: Number, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    status:{type:String,required:false, default:'pending'},
    receiver:{type:String,required:false},
    sender:{type:String,required:false},
    comments: [
        {
            content: { type: String, required: false },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModel'
            }
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, { timestamps: true })

export default mongoose.model('ServiceRequestModel', serviceRequestSchema, 'serviceRequests');