
import { Request, Response } from 'express';
import { SessionModel } from '../models/session.js';

export async function logout(req: Request, res: Response) {
  let sessionID = req.cookies['auth-session'];
  if (!sessionID) {
    return;
  }

  sessionID = sessionID.trim();

  await SessionModel.deleteOne({ _id: sessionID });
  res.clearCookie('auth-session', { httpOnly: true });
  res.status(200);
  res.send('Logged out');
}