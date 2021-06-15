'use strick';

import { NextFunction, Request, Response } from 'express';
import authToken from '../handlers/authToken';

import { getEmail, validPassword, createNewUser, prepareUserResponse } from '../handlers/auth';

import AuthService from '../services/auth.services';

export interface IRefresh {
  accessToken: string;
  refreshToken: string;
  expiresIn: string | number;
}

export default class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = await createNewUser(req.body);

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const userFromDb = await getEmail(email);

      await validPassword(password, userFromDb);

      req.user = await prepareUserResponse(userFromDb);

      next();
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.set('Authorization', `Bearer ""`);
      res.set('Refresh-Authorization', `Bearer ""`);

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = req.user;

      const { accessToken, refreshToken, expiresIn }: IRefresh = await authToken.createTokens(
        user.id,
      );

      res.set('Authorization', `Bearer ${accessToken}`);
      res.set('Refresh-Authorization', `Bearer ${refreshToken}`);

      return res.status(201).json({ ...user, accessToken, refreshToken, expiresIn });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next: NextFunction): Promise<void> {
    try {
      const RefreshHeader = req.get('Refresh-Authorization' || '');

      req.user = await AuthService.refresh(RefreshHeader);

      next();
    } catch (error) {
      next(error);
    }
  }

  static async authorize(req, res, next: NextFunction): Promise<void> {
    try {
      console.log('authorizationHeader controller  start>>>');
      const authorizationHeader = req.get('Authorization' || '');

      req.user = await AuthService.authorize(authorizationHeader);

      console.log('authorizationHeader controller  end>>>');
      next();
    } catch (err) {
      next(err);
    }
  }
}
