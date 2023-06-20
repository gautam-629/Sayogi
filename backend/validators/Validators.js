import Joi, { types } from 'joi'

export const phoneNumberSchema = Joi.string()
  .length(10)
  .pattern(/^(98|97)/)
  .required();

export const verityOtpSchema = Joi.object({
  otp: Joi.string().required(),
  phoneNumber: Joi.string().length(10).pattern(/^(98|97)/)
    .required(),
  hash: Joi.string().required()
})

export const activateScheme = Joi.object({
  name: Joi.string().required().min(3).max(20),
  avatar: Joi.string().required()
})

export const serviceSeekerSchema = Joi.object({
  title: Joi.string().required(),
  address: Joi.string().required(),
  charge: Joi.number().required(),
  skills: Joi.string(),
  experience: Joi.string(),
  duration: Joi.string().required(),
  email:Joi.string(),
  cv: Joi.string(),
})