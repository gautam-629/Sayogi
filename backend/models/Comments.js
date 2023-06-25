import mongoose from 'mongoose';

let commentSchema=new mongoose.Schema({
    serviceRequest:{type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
     content:{type:String,required:true},
     serSeeker:{type:mongoose.Schema.Types.ObjectId,
        ref:'ServiceSeekerModel'
    }
})

export default mongoose.model('CommentModel',commentSchema,'comments');