import userModels from "../models/userModels";
import CustomErrorHandler from "../services/customErrorHandler";

const admin = async (req, res, next) => {
  try {
    const user = await userModels.findOne({ _id: req.currentUser._id });
    if (!user.role === "admin") {
      return next(
        new CustomErrorHandler.unAuthorized("Only admin allow to access")
      );
    }
    next();
  } catch (error) {
    return next(error);
  }
};
export default admin;
