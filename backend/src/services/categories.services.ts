import { IError } from 'src/interface/interface';

import categoriesModel, { ICategoriesSchema } from '../models/categories';
import userModel, { IUserSchema } from '../models/user';

export interface ICategories {
  name: string;
  description: string;
  userId: string;
}

export interface ICategoriesChange {
  userId: string | number;
  itemId: string | number;
}

export default class Categories {
  static createCategories = async (data: ICategories): Promise<void> => {
    try {
      const { userId } = data;

      const newCategories = await categoriesModel.create({
        ...data,
      });

      await userModel.addItemInUser(userId, 'categories', newCategories._id);
    } catch (error) {
      throw error;
    }
  };

  static getCategories = async (): Promise<ICategoriesSchema[]> => {
    try {
      const categories: ICategoriesSchema[] = await categoriesModel.find();

      return categories;
    } catch (error) {
      throw error;
    }
  };

  static getCategoriesById = async (id: string | number): Promise<ICategoriesSchema> => {
    try {
      const fork = await categoriesModel.findCategoriesById(id);

      if (!fork) {
        const err: IError = new Error('Fork is not found');
        err.statusCode = 409;
        throw err;
      }

      return fork;
    } catch (error) {
      throw error;
    }
  };

  static addCategoriesUser = async (
    userId: string | number,
    categoriesId: string | number,
  ): Promise<IUserSchema> => {
    try {
      return await userModel.addItemInUser(userId, 'categories', categoriesId);
    } catch (error) {
      throw error;
    }
  };

  static removeCategoriesUser = async (
    userId: string | number,
    itemId: string | number,
  ): Promise<void> => {
    try {
      await userModel.removeItemFromUser(userId, 'categories', itemId);
      await categoriesModel.removeCategories(itemId);
    } catch (error) {
      throw error;
    }
  };
}
