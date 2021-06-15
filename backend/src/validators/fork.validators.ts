'use strick';

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import { IError } from 'src/interface/interface';

export default class AuthValidator {
  static validateCreateFork(req: Request, res: Response, next: NextFunction): void {
    try {
      const forkTemple: Joi.ObjectSchema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
      });

      const validated: Joi.ValidationResult = forkTemple.validate(req.body);

      if (validated.error) {
        const err: IError = new Error(
          `incorrect ${validated.error.details[0].context.label} or too short`,
        );
        err.statusCode = 400;
        throw err;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
