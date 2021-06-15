'use strick';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../config/env.keys';
import { IError } from '../interface/interface';

export type TJWTOptions = {
  expiresIn: string | number;
};

export type TValidToken = {
  id?: string | number;
  iat?: string | number;
  exp?: string | number;
};

export default class Security {
  static hashPassword = async (data: string): Promise<string> => {
    try {
      const salt = await bcrypt.genSalt(config.SALT.length);

      return await bcrypt.hash(data, salt);
    } catch (error) {
      throw error;
    }
  };

  static getHashPassword = async (pass: string, hashPass: string): Promise<boolean> => {
    try {
      const valid = await bcrypt.compare(pass, hashPass);

      return valid;
    } catch (error) {
      throw error;
    }
  };

  static createToken = async (id: string | number, options: TJWTOptions): Promise<string> => {
    try {
      return jwt.sign({ id }, config.JWT_SECRET, options);
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
