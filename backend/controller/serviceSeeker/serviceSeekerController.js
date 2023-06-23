
import fs from 'fs';
import { handleMultipartData } from "../../config";
import CustomErrorHandler from "../../services/customErrorHandler";
import { serviceSeekerSchema } from '../../validators/validators';
import ServiceSeekerModel from '../../models/serviceSeeker';
import ServiceSeeker from '../../dtos/ServiceSeeker';
import mapServiceSeekersToDTO from '../../dtos/getAllServiceSeekerDTO';
const Serviceseekers={
    createAccount(req,res,next){
       handleMultipartData(req,res,async(err)=>{
          if(err){
            return next(CustomErrorHandler.serverError(err.message));
          }
          const filePath = req.file.path;
          //validation
          try {
            const result= await serviceSeekerSchema.validateAsync(req.body);
          } catch (error) {
              // Delete the uploaded file
              fs.unlink(`${appRoot}/${filePath}`, (err) => {
                if (err) {
                    return next(
                        CustomErrorHandler.serverError(err.message)
                    );
                }
            });
              return next(error);
          }

          let currentUser=req.currentUser._id;
          const {title,address,charge,skills,experience,duration,email}=req.body;

          let serviceSeeker
           try {
               serviceSeeker= await ServiceSeekerModel.create({
                title,
                address,
                charge,
                skills,
                experience,
                duration,
                email,
                cv: `/${filePath}`,
                user:currentUser
              })
           } catch (error) {
              return next(error);
           }
           res.status(201).json({
            serviceSeeker:serviceSeeker
           })
       })
    },

  async  getAllServiceSeeker(req,res,next){
           try {
               const serviceSeeker = await ServiceSeekerModel.find().populate('user','phoneNumber name avatar');
               const serviceSeekerDto= mapServiceSeekersToDTO(serviceSeeker);
               res.status(201).json({
                serviceSeeker:serviceSeekerDto
               })
           } catch (error) {
            return next(error);
           }
    },

    async  getSingleServiceSeeker(req,res,next){
      try {
          const serviceSeeker = await ServiceSeekerModel.findById(req.params.id).populate('user','phoneNumber name avatar');
          const serviceSeekerDto=new ServiceSeeker(serviceSeeker);
          res.status(201).json({
           serviceSeeker:serviceSeekerDto
          })
      } catch (error) {
       return next(error);
      }
}
  
}

export default Serviceseekers;