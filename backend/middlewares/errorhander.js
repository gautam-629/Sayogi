
import { DEBUG_MODE } from "../config";
import { ValidationError } from "joi";
import CustomErrorHandler from "../services/customErrorHandler";
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: 'internal serer error',
    ...(DEBUG_MODE === 'true' && { originalError: err.stack })
  }
  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.stack
    }
  }
  if (err instanceof CustomErrorHandler) {
    statusCode = err.statusCode;
    data = {
      message: err.stack
    }
  }

  return res.status(statusCode).json(data)
}

export default errorHandler;