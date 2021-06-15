import jwt from 'jsonwebtoken';
import { IError } from 'src/interface/interface';

import config from '../config/env.keys';

export type TJWTOptions = {
  expiresIn: string | number;
};

export type TValidToken = {
  id?: string | number;
  iat?: string | number;
  exp?: string | number;
};

const createToken = async (id: string | number, options: TJWTOptions): Promise<string> => {
  try {
    return jwt.sign({ id }, config.JWT_SECRET, options);
  } catch (error) {
    throw error;
  }
};

export default class authToken {
  static updateAccessToken = async (userID: string | number): Promise<string> => {
    try {
      const accessTokenOptions = { expiresIn: 30 * 60 };

      const accessToken = await createToken(userID, accessTokenOptions);

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
        accessToken: await createToken(id, accessTokenOptions),
        refreshToken: await createToken(id, refreshTokenOptions),
        expiresIn: 2 * 24 * 60 * 60,
      };

      return newToken;
    } catch (error) {
      throw error;
    }
  };

  static validToken = async (token: string): Promise<TValidToken> => {
    const id: TValidToken = jwt.verify(token, config.JWT_SECRET) as TValidToken;

    if (!id) {
      const err: IError = new Error('User not authorized');
      err.statusCode = 401;
      throw err;
    }

    return id;
  };
}
