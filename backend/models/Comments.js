import mongoose from 'mongoose';

let commentSchema=new mongoose.Schema({
    serviceRequest:{type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
     content:{type:String,required:true},
   
})

export default mongoose.model('CommentModel',commentSchema,'comments');