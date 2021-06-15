

import { NextFunction, Request, Response } from 'express';

import { IError } from '../interface/interface';
import env from '../config/env.keys';

//Handler for whitening and error handling
export default (err: IError, req: Request, res: Response, next: NextFunction) => {
  if (env.NODE_ENV === 'dev') {
    console.log(err);
  }

  const code = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(code).json({ error: message });
};
