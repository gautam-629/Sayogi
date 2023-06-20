
import fs from 'fs';
import { handleMultipartData } from "../../config";
import CustomErrorHandler from "../../services/customErrorHandler";
import { serviceSeekerSchema } from "../../validators/Validators";
import ServiceSeekerModel from '../../models/serviceSeeker';
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
                cv: filePath,
                user:currentUser
              })
           } catch (error) {
              return next(error)
           }
           res.status(201).json({
            serviceSeeker:serviceSeeker
           })
       })
    }
}

export default Serviceseekers;