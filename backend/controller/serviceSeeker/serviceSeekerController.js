
import fs from 'fs';
import { handleMultipartData } from "../../config";
import CustomErrorHandler from "../../services/customErrorHandler";
import { serviceSeekerSchema } from '../../validators/validators';
import userModels  from '../../models/userModels';
import UserDto from '../../dtos/UserDto';
import mapUserDTO from '../../dtos/getAllUserDTO';
const Serviceseekers = {
  createAccount(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;
      //validation
      try {
        const result = await serviceSeekerSchema.validateAsync(req.body);
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

      const { title, address, charge, skills, experience, duration, email } = req.body;
      
      try {
        const userId = req.currentUser._id;
        
        const updatedUser = await userModels.updateOne(
          { _id: userId },
          {
            $set: {
              title: title,
              address: address,
              charge: charge,
              skills: skills,
              experience: experience,
              duration: duration,
              email: email,
              serviceSeeker:true,
              cv: `/${filePath}`
            }
          }
        );
      
        if (updatedUser.n === 0) {
          return next(CustomErrorHandler.notFound("ServiceSeeker not found"));
        }
      
        const user = await userModels.findOne({ _id: userId });
        const userDto = new UserDto(user);
        res.json({
          user: userDto,
          auth: true
        });
      } catch (error) {
        return next(error);
      }
      
    })
  },

  async getAllServiceSeeker(req, res, next) {
    try {
      const user = await userModels.find({serviceSeeker:true});
      
        const users= mapUserDTO(user)
        res.status(201).json({
          users: users
        })
      
    } catch (error) {
      return next(error);
    }
  },

  async getSingleServiceSeeker(req, res, next) {
    try {
      const user = await userModels.findById(req.params.id);
      const userDto = new UserDto(user);
        res.json({
          user: userDto,
          auth: true
        })
    } catch (error) {
      return next(error);
    }
  }

}

export default Serviceseekers;