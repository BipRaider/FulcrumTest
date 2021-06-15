'use strick';

import { NextFunction, Request, Response } from 'express';

import Fork, { IForkChange } from '../services/fork.services';

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
      const { name, description, categories: categoriesId } = req.body;
      console.log('message');
      console.dir(req.body);
      console.log('message');
      await Fork.createFork({ userId, name, description, categoriesId });

      return res.status(201).json({ messages: 'Fork add' });
    } catch (error) {
      next(error);
    }
  }

  //GET:
  static async one(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await Fork.getForkById(id);

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  //GET:
  static async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { page, list } = req.body;

      const forks = await Fork.getForks(page, list);

      return res.status(201).json(forks);
    } catch (error) {
      next(error);
    }
  }
  //DELETE:
  static async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { userId, itemId } = req.body as IForkChange;

      await Fork.removeForkUser(userId, itemId);

      return res.status(201).json({ messages: 'Fork delete' });
    } catch (error) {
      next(error);
    }
  }
}
