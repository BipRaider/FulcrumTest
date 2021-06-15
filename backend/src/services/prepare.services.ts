'use strick';

import { IUserSchema } from '../models/user/index';

export default class Prepare {
  static prepareUser = async (user: IUserSchema): Promise<any> => {
    const { _id, email, name, categories = [], forks = [] }: IUserSchema = user;

    return {
      email,
      name,
      id: _id,

      forks,
      categories,
    };
  };

  static itemList = async (list: string[] | any): Promise<any> => {
    try {
      const itemList: string[] = [];

      for await (const doc of list) {
        itemList.push(...doc);
      }

      return itemList;
    } catch (error) {
      throw error;
    }
  };
}
