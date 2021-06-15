'use strick';

import { authToken } from './';
import { TValidToken } from './authToken';

export default async (token: string): Promise<TValidToken> => authToken.validToken(token);
