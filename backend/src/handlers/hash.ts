

import bcrypt from 'bcryptjs';

import config from '../config/env.keys';

export default {
  hashPassword: async (data: string): Promise<string> => {
    try {
      const salt = await bcrypt.genSalt(config.SALT.length);

      return await bcrypt.hash(data, salt);
    } catch (error) {
      throw error;
    }
  },

  getHashPassword: async (pass: string, hashPass: string): Promise<boolean> => {
    try {
      const valid = await bcrypt.compare(pass, hashPass);

      return valid;
    } catch (error) {
      throw error;
    }
  },
};
