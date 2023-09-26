import ServiceRequestModel from "../../models/ServiceRequest"
import userModels from "../../models/userModels";

const HiredUserController={
   async findHiredUser(req,res,next){
       try {
      const hiredUser= await ServiceRequestModel.find({status:'accept'})
        .populate('sender')
        .populate('receiver')

        res.status(201).json({
             hiredUser,
             sucess:true
        })
       } catch (error) {
          return next(error);
       }
    },

 async updateUser(req,res,next){
        const {data,userId}=req.body;

        console.log(data,userId)
       try {
       const user= await userModels.findByIdAndUpdate(userId,data);
 
         res.status(201).json({
              sucess:true,
              msg:"User Updated Sucessfully"
         })

       } catch (error) {
         return next(error)
       }
    }
}

export default HiredUserController;