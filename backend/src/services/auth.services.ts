import userModel from '../models/user';

import { getUserIdFromToken } from '../handlers';

import { IError } from '../interface/interface';
import { TValidToken } from '../handlers/authToken';

import Security from './security.services';

export interface IUser {
  name: string;
  password: string;
  email: string;
}

export interface IUserCreated {
  name: string;
  email: string;
}

export default class AuthService {
  static async authorize(authorizationHeader) {
    try {
      if (!authorizationHeader) {
        const err: IError = new Error('User not authorized');
        err.statusCode = 401;
        throw err;
      }

      const token = authorizationHeader.replace('Bearer ', '');

      const userId: TValidToken = await getUserIdFromToken(token);

      const user = await userModel.findById(userId.id);

      if (!user || !token) {
        const err: IError = new Error('User not authorized');
        err.statusCode = 401;
        throw err;
      }
      return user;
    } catch (error) {
      const err: IError = new Error('User not authorized');
      err.statusCode = 401;
      throw err;
    }
  }

  static async refresh(refreshHeader) {
    try {
      if (!refreshHeader) {
        const err: IError = new Error('User not authorized');
        err.statusCode = 401;
        throw err;
      }

      const token = refreshHeader.replace('Bearer ', '');

      const userId = await Security.validToken(token);

      const user = await userModel.findById(userId);

      if (!user) {
        const err: IError = new Error('User not authorized');
        err.statusCode = 401;
        throw err;
      }

      return user;
    } catch (error) {
      const err: IError = new Error('User not authorized');
      err.statusCode = 401;
      throw err;
    }
  }

  static createNewUser = async (data: IUser): Promise<IUserCreated> => {
    try {
      const { email, password, name } = data;

      const validUser = await userModel.findUserByEmail(email);

      if (validUser) {
        const err: IError = new Error(
          'You could not register or a user with such an email exists or something went wrong',
        );
        err.statusCode = 409;
        throw err;
      }

      const hashPass = await Security.hashPassword(password);

      await userModel.create({
        ...data,
        password: hashPass,
      });

      return { name, email };
    } catch (error) {
      throw error;
    }
  };

  static updateAccessToken = async (userID: string | number): Promise<string> => {
    try {
      const accessTokenOptions = { expiresIn: 30 * 60 };

      const accessToken = await Security.createToken(userID, accessTokenOptions);

      return accessToken;
    } catch (error) {
      throw error;
    }
  };

  static createTokens = async (id: string | number) => {
    try {
      const accessTokenOptions = { expiresIn: 30 * 60 };
      const refreshTokenOptions = { expiresIn: 2 * 24 * 60 * 60 };

      const newToken = {
        accessToken: await Security.createToken(id, accessTokenOptions),
        refreshToken: await Security.createToken(id, refreshTokenOptions),
        expiresIn: 2 * 24 * 60 * 60,
      };

      return newToken;
    } catch (error) {
      throw error;
    }
  };
}
