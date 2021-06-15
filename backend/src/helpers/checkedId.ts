import { IError } from 'src/interface/interface';

import { Types } from 'mongoose';

export default (id: string | number): void => {
  if (!Types.ObjectId.isValid(id)) {
    const err: IError = new Error('Invalid id');
    err.statusCode = 404;
    throw err;
  }
};
