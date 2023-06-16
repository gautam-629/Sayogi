import jwt from 'jsonwebtoken';
import RefreshModel from '../models/refreshModel';
import { refreshTokenSecret, accessTokenSecret } from '../config';
import { NextFunction } from 'express';
class TokenServices {

  static generateAccessToken(payload) {
    return jwt.sign(payload, accessTokenSecret, { expiresIn: '1h' });
  }

  static generateRefressToken(payload) {
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: '1h' })
  }

  static async storeRefreshToken(token, userId, next) {
    try {
      await RefreshModel.create({
        token,
        userId
      })
    } catch (error) {
      return next(error);
    }
  }

  static async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  static async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }

  static async findRefreshToken(userId, refreshToken) {
    return await RefreshModel.findOne({
      userId: userId,
      token: refreshToken,
    });
  }

  static async updateRefreshToken(userId, refreshToken) {
    return await RefreshModel.updateOne(
        { userId: userId },
        { token: refreshToken }
    );
}

static async removeToken(refreshToken) {
  return await RefreshModel.deleteOne({ token: refreshToken });
}


}

export default TokenServices;