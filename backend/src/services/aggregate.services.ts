'use strick';

import { IForkSchema, TForkModel } from '../models/fork';
import { ICategoriesSchema, TCategoriesModel } from '../models/categories';

import Prepare from './prepare.services';

export default class Aggregate {
  static item = async (
    userId: string,
    from: string,
    itemId: string,
    db: TForkModel | TCategoriesModel,
  ): Promise<IForkSchema | ICategoriesSchema> => {
    try {
      return await db.aggregateDB(userId, from, itemId);
    } catch (error) {
      throw error;
    }
  };

  static itemList = async (
    userId: string,
    from: string,
    list: [],
    db: TForkModel | TCategoriesModel,
  ): Promise<IForkSchema | ICategoriesSchema> => {
    try {
      const aggregateItem = async itemId => {
        if (!itemId) {
          return { [from]: [] };
        }

        return await db.aggregateDB(userId, from, itemId);
      };

      const newList = list.map(async value => aggregateItem(value));

      return await Prepare.itemList(newList);
    } catch (error) {
      throw error;
    }
  };
}
