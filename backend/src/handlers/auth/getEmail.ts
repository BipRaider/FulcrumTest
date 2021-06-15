import { IError } from 'src/interface/interface';
import userModel from '../../models/user';

export default async email => {
  try {
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      const err: IError = new Error('Email or password is wrong');
      err.statusCode = 401;
      throw err;
    }

    return user;
  } catch (error) {
    throw error;
  }
};
