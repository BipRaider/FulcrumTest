import userModel from '../../models/user';
import { IError } from 'src/interface/interface';
import { hash } from '../';

const { hashPassword } = hash;

export interface IUser {
  name: string;
  password: string;
  email: string;
}

export interface IUserCreated {
  name: string;
  email: string;
}

export default async (data: IUser): Promise<IUserCreated> => {
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

    const hashPass = await hashPassword(password);

    await userModel.create({
      ...data,
      password: hashPass,
    });

    return { name, email };
  } catch (error) {
    throw error;
  }
};
