
import { Request, Response } from 'express';
import { SessionModel } from '../remote/models/session.js';
import { Errors } from '../errors.js';

export async function logout(req: Request, res: Response) {
  let sessionID = req.cookies['auth-session'];
  if (!sessionID) {
    res.status(400);
    res.send(Errors.USER_UNAUTHENTICATED);
  }

  sessionID = sessionID.trim();

  await SessionModel.deleteOne({ _id: sessionID });
  res.clearCookie('auth-session', { httpOnly: true });
  res.status(200);
  res.send('Logged out');
}