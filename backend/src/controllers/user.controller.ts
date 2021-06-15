'use strick';

// import User from '../services/user.services';
import Aggregate from '../services/aggregate.services';

import forkModel from '../models/fork';
import categoriesModel from '../models/categories';

export default class UserController {
  static async getUser(req, res, next) {
    try {
      const { _id: userId, forks, categories } = req.user;

      const forkList = await Aggregate.itemList(userId, 'forks', forks, forkModel);

      const categoriesList = await Aggregate.itemList(
        userId,
        'categories',
        categories,
        categoriesModel,
      );

      const user = await {
        ...req.user._doc,
        forks: forkList,
        categories: categoriesList,
      };

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
