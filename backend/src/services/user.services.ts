'use strick';

import { IError } from 'src/interface/interface';

import userModel, { IUserSchema } from '../models/user';

import Prepare from './prepare.services';

export default class User {
  static getUserById = async (id: string | number): Promise<IUserSchema> => {
    try {
      const user: IUserSchema = await userModel.findById(id);

      if (!user) {
        const err: IError = new Error('Fork is not found');
        err.statusCode = 409;
        throw err;
      }

      return user;
    } catch (error) {
      throw error;
    }
  };
}
