import notificationModels from "../../models/notificationModels"
import CustomErrorHandler from "../../services/customErrorHandler";

const NotificationController={
     async create(req,res,next){
        let sender=req.currentUser._id;
        const {reciverID, serviceRequest}=req.body;
        try {
            const notification= await notificationModels.create({
                reciverID:reciverID,
                serviceRequest:serviceRequest,
                sender:sender
            })
            res.status(201).json({
                notification:notification
            })
        } catch (error) {
            return next(error);
        }
     },
     async findNotification(req,res,next){
        try {
          const notification= await notificationModels.find({reciverID:req.currentUser._id})
          .populate('sender','name avatar phoneNumber')
          .populate('serviceRequest')
        
          res.status(201).json({
            notification:notification
          })
        } catch (error) {
            return next(error);
        }
     }
}
export default NotificationController;