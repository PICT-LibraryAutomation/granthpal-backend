
import pino from 'pino';
import { Request, Response } from 'express';
import { AuthCtx, fetchAuthCtx } from './auth/fetch.js';

export interface APIContext {
  logger: pino.Logger,
  auth: AuthCtx,
}

export async function getAPIContext(req: Request, res: Response, logger: pino.Logger): Promise<APIContext> {
  const authCtx = await fetchAuthCtx(req);
  return {
    logger,
    auth: authCtx,
  };
}