import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: false},
    name: { type: String, required: false },
    avatar: { type: String, required: false, },
    activated: { type: Boolean, required: false, default: false },
    role: { type: String, default: "user" },
    title: { type: String, required: false },
    address: { type: String, required: false },
    charge: { type: Number, required: false },
    skills: { type: String, required: false },
    experience: { type: String, required: false },
    duration: { type: String, required: false },
    email: { type: String, required: false },
    cv: { type: String, required: false },
    rating: { type: Number, default: 0 },
    serviceSeeker:{type:Boolean, default:false},
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: false
            },
            rating: {
                type: Number,
                required: false
            },
        }
    ],
}, { timestamps: true })

export default mongoose.model('UserModel', userSchema, 'users');