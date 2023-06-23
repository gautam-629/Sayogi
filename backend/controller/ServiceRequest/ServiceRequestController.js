import { serviceRequestSchema } from "../../validators/Validators";
import ServiceRequestModel from '../../models/ServiceRequest';
import mapServiceRequestToDTO from "../../dtos/ServiceRequst";
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

  async getAllServiceRequest(req,res,next){
                try {
                    const serviceRequest= await ServiceRequestModel.find().populate('creator','name avatar');

                    const mapServiceRequest=mapServiceRequestToDTO(serviceRequest)
                    res.status(201).json({
                        serviceRequest:mapServiceRequest
                    })

                } catch (error) {
                    return next(error);
                }
    }
}

export default serviceRequestController;