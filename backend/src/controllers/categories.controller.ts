'use strick';

import { NextFunction, Request, Response } from 'express';

import Categories from '../services/categories.services';

interface IReqUser {
  user: {
    _id: string;
    name: string;
    description: string;
  };
}

export default class ForkController {
  //POST:
  static async create(
    req: Request & IReqUser,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { _id: userId } = req.user;
      const { name, description } = req.body;

      await Categories.createCategories({ userId, name, description });

      return res.status(201).json({ messages: 'Categories add' });
    } catch (error) {
      next(error);
    }
  }

  //GET:
  static async one(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await Categories.getCategoriesById(id);

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  //GET:
  static async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { page, list } = req.body;

      const user = await Categories.getCategories();

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  //DELETE:
  static async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { userId, itemId } = req.body;

      await Categories.removeCategoriesUser(userId, itemId);

      return res.status(201).json({ messages: 'Fork delete' });
    } catch (error) {
      next(error);
    }
  }
}
