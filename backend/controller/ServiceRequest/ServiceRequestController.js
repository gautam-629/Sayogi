import { serviceRequestSchema } from "../../validators/Validators";
import ServiceRequestModel from '../../models/ServiceRequest';
import mapServiceRequestToDTO from "../../dtos/ServiceRequst";
import CustomErrorHandler from "../../services/customErrorHandler";
const serviceRequestController={
   async serviceRequest(req,res,next){
       //validation
       try {
        const result= await serviceRequestSchema.validateAsync(req.body);
       } catch (error) {
        return next(error)
       }
       //create a ServiceReqest
       try {
        let currentUser=req.currentUser._id;
        const {title,charge,address,description,duration}=req.body;
        const serviceRequest= await ServiceRequestModel.create({
            title:title,
            charge:charge,
            address:address,
            description:description,
            duration:duration,
            creator:currentUser
        })
      
        res.status(201).json({
            serviceRequest:serviceRequest
        })
       } catch (error) {
        return next(error);
       }
    },


async getAllServiceRequest(req, res, next) {
    try {
      const serviceRequests = await ServiceRequestModel.find()
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: 'name avatar _id',
          },
        })
        .populate('creator', 'name avatar');
  
      const mapServiceRequest = mapServiceRequestToDTO(serviceRequests);
      res.status(201).json({
        serviceRequest:mapServiceRequest,
      });
    } catch (error) {
      return next(error);
    }
  },

  async UpdateOne(req,res,next){
         const {serviceID,status,receiver}=req.body;
        
        if(receiver!=undefined){
        var data={
          status:status,
          receiver:receiver,
          sender:req.currentUser._id,
          acceptOn:Date.now()
        }
      }
      else{
        var data={
          status:status,
          acceptOn:Date.now()
        }
      }
        try {
          const serviceRequest= await ServiceRequestModel.findByIdAndUpdate(serviceID,data);
          if(!serviceRequest){
            return next(CustomErrorHandler.notFound("Service Not found"))
          }
          res.status(201).json({
             serviceRequest:serviceRequest
          })
        } catch (error) {
          return next(error)
        }
  },
  
 async findOneReceiver(req,res,next){
        let condition={
          receiver:req.currentUser._id,
          status:'accept'
        }
         try {
          const serviceRequest= await ServiceRequestModel.find(condition)
            .populate('sender','name' )

            res.status(201).json({
              serviceRequest:serviceRequest
            })
         } catch (error) {
            return next(error);
         }
  },

  async findOneProvider(req,res,next){
    let condition={
      sender:req.currentUser._id,
      status:'accept'
    }
     try {
      const serviceRequest= await ServiceRequestModel.find(condition)
        .populate('receiver','name' )

        res.status(201).json({
          serviceRequest:serviceRequest
        })
     } catch (error) {
        return next(error);
     }
},

async findServiceHistory(req,res,next){
  
  let condition={
    creator:req.currentUser._id,
    status:'accept'
  }
   try {
    const serviceRequest= await ServiceRequestModel.find(condition)
      .populate('creator','name avatar' )

      res.status(201).json({
        serviceRequest:serviceRequest
      })
   } catch (error) {
      return next(error);
   }
}

}

export default serviceRequestController;