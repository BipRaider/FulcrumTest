'use strick';

import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';

export type TExpress = {
  err?: ErrorRequestHandler;
  req: Request;
  res: Response;
  next?: NextFunction;
};
