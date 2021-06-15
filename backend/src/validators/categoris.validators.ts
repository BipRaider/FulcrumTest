'use strick';

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import { IError } from 'src/interface/interface';

export default class AuthValidator {
  static validateCreateUser(req: Request, res: Response, next: NextFunction): void {
    try {
      const userTemple: Joi.ObjectSchema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string()
          .min(3)
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw', 'ua'] } })
          .required(),
        password: Joi.string().min(3),
      });

      const validated: Joi.ValidationResult = userTemple.validate(req.body);

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

  static validateSingIn(req: Request, res: Response, next: NextFunction): void {
    try {
      const userTemple: Joi.ObjectSchema = Joi.object({
        email: Joi.string()
          .min(3)
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw'] } })
          .required(),
        password: Joi.string().min(3),
      });

      const validated: Joi.ValidationResult = userTemple.validate(req.body);

      if (validated.error) {
        const err: IError = new Error(`Incorrect  ${validated.error.details[0].context.label}`);
        err.statusCode = 401;
        throw err;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
