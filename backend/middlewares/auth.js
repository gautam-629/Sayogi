
import CustomErrorHandler from "../services/customErrorHandler";
import TokenServices from "../services/tokenServices";

const auth= async (req,res,next)=>{
        let authHeader=req.headers.authorization;
        if(!authHeader){
            return next(CustomErrorHandler.unAuthorized());
        }
        const token= authHeader.split(' ')[1];
        try {
            const {_id} = await TokenServices.verifyAccessToken(token);
            const user={_id};
            req.currentUser=user;
              next();
        } catch (error) {
            return next(CustomErrorHandler.unAuthorized());
        }
}            
export default auth;