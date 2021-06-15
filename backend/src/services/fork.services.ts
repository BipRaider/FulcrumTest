'use strick';

import { IError } from 'src/interface/interface';

import categoriesModel from '../models/categories';
import forkModel, { IForkSchema } from '../models/fork';
import userModel, { IUserSchema } from '../models/user';

export interface IFork {
  name: string;
  description: string;
  userId: string;
  categoriesId?: string;
}

export interface IForkChange {
  userId: string | number;
  itemId: string | number;
}

export default class Fork {
  static createFork = async (data: IFork): Promise<void> => {
    try {
      const { userId, categoriesId } = data;

      const newFork = await forkModel.create({
        ...data,
      });

      await userModel.addItemInUser(userId, 'forks', newFork._id);
      await categoriesModel.addItemInCategories(categoriesId, 'forks', newFork._id);
    } catch (error) {
      throw error;
    }
  };

  static getForks = async (page: number, list: number): Promise<IForkSchema[]> => {
    try {
      const forks: IForkSchema[] = await forkModel
        .find()
        .sort({ data: -1 })
        .skip(Number(page) || 0)
        .limit(Number(list) || 6);

      return forks;
    } catch (error) {
      throw error;
    }
  };

  static getForkById = async (id: string | number): Promise<IForkSchema> => {
    try {
      const fork = await forkModel.findForkById(id);

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

  static addForkUser = async (
    userId: string | number,
    forkId: string | number,
  ): Promise<IUserSchema> => {
    try {
      return await userModel.addItemInUser(userId, 'forks', forkId);
    } catch (error) {
      throw error;
    }
  };

  static removeForkUser = async (
    userId: string | number,
    itemId: string | number,
  ): Promise<void> => {
    try {
      await userModel.removeItemFromUser(userId, 'forks', itemId);
      await categoriesModel.removeItemFromCategories(userId, 'forks', itemId);
      await forkModel.removeFork(itemId);
    } catch (error) {
      throw error;
    }
  };
}
