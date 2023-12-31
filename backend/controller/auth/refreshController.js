import TokenServices from "../../services/tokenServices";
import userModels from "../../models/userModels";
import UserDto from "../../dtos/UserDto";
class refreshController {
  static async refresh(req, res, next) {
    const { refreshTokenFrombody } = req.body;
    //verify
    let userData;
    try {
      userData = await TokenServices.verifyRefreshToken(refreshTokenFrombody);
    } catch (error) {
      return next(error);
    }
    //check if token in db
    try {
      const token = await TokenServices.findRefreshToken(
        userData._id,
        refreshTokenFrombody
      );
      if (!token) {
        throw new Error("Invalid token during searching database");
      }

      // check the user
      const user = await userModels.findOne({ _id: userData._id });
      if (!user) {
        return next("No user");
      }
      // generate new token
      let accessToken = TokenServices.generateAccessToken({
        _id: userData._id,
      });
      let refreshToken = TokenServices.generateRefressToken({
        _id: userData._id,
      });

      //update in the database
      await TokenServices.updateRefreshToken(userData._id, refreshToken);

      const userDto = new UserDto(user);

      res.json({
        user: userDto,
        accessToken: accessToken,
        refreshToken: refreshToken,
        auth: true,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default refreshController;
