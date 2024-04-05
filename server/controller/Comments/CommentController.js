
import ServiceRequestModel from '../../models/ServiceRequest'
import userModels from '../../models/userModels';
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
      },

    async  Review(req,res,next){
        try {
          const {rating,userId}=req.body;
          
          const review={
            user:req.currentUser._id,
            rating:Number(rating)
          }

          const user= await userModels.findById(userId);

          const isReview=user.reviews.find(
            r=>r.user.toString()===req.currentUser._id.toString()
          )

          if(isReview){
            user.reviews.forEach(review=>{
              if(review.user.toString()===req.currentUser._id.toString()){
                 review.rating=rating;
              }
            })
          }
          else{
            user.reviews.push(review);
          }

          user.rating=user.reviews.reduce((pre,curr)=>curr.rating+pre,0) / user.reviews.length;
           
          await user.save();

          res.status(201).json({
            sucess:true
          })

        } catch (error) {
          return next(error);
        }
      }
}

export default CommentsController;