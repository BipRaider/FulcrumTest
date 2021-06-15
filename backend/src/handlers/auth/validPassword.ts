

import { IError } from 'src/interface/interface';

import { hash } from '../';
const { getHashPassword } = hash;

export default async (pass, user) => {
  try {
    const { password } = user;

    const isPasswordValid = await getHashPassword(pass, password);

    if (!isPasswordValid) {
      const err: IError = new Error('Email or password is wrong');
      err.statusCode = 401;
      throw err;
    }

    return isPasswordValid;
  } catch (error) {
    throw error;
  }
};
