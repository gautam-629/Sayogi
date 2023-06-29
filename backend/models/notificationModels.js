import mongoose,{Schema} from "mongoose";

const notificationSchema=new mongoose.Schema({
    reciverID:{type:String},
    serviceRequest:{type:mongoose.Schema.Types.ObjectId,
         ref:'ServiceRequestModel'
      },
     sender:{type:mongoose.Schema.Types.ObjectId,
          ref:'UserModel'
    }
},{timestamps:true})

export default mongoose.model("NotificationModel",notificationSchema,'notification');