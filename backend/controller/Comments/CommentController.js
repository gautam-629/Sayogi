
import ServiceRequestModel from '../../models/ServiceRequest'
import CustomErrorHandler from '../../services/customErrorHandler';
const  CommentsController={
     async create(req,res,next){
         try {
          const {id,content}=req.body;
          const comment={
            user:req.currentUser._id,
            content:content
          }
          const serviceRequest= await ServiceRequestModel.findById(id);
          if(!serviceRequest){
              return next(CustomErrorHandler.notFound('ServiceRequest not found'));
          }
          serviceRequest.comments.push(comment);
         
           await serviceRequest.save();

           res.json({
               serviceRequest:serviceRequest
           })

         } catch (error) {
            return next(error)
         }
      }
}

export default CommentsController;