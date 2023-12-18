
import moment from 'moment';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from '../remote/models/user.js';
import { SessionModel } from '../remote/models/session.js';
import { Errors } from '../errors.js';

export async function login(req: Request, res: Response) {
  const sessionID = req.cookies['auth-session'];
  if (sessionID && sessionID != '') {
    res.status(400);
    res.send(Errors.ALREADY_AUTHENTICATED);
    return;
  }

  let prn: string = req.body.prn;
  let password: string = req.body.password;

  if (!prn || !password || prn === '' || password === '') {
    res.status(400);
    res.send(Errors.INVALID_DETAILS_PROVIDED);
    return;
  }

  prn = prn.trim();
  password = password.trim();

  const user = await UserModel.findOne({ prn });
  if (!user) {
    res.status(400);
    res.send(Errors.INVALID_DETAILS_PROVIDED);
    return;
  }

  if (!bcrypt.compareSync(password, user.passwordHash)) {
    res.status(400);
    res.send(Errors.INCORRECT_PASSWORD);
    return;
  }

  const sessionDoc = new SessionModel({
    uid: user.id,
    prn: user.prn,
    loggedIn: moment().toDate(),
  });
  const session = await sessionDoc.save();

  res.cookie('auth-session', session.id, { httpOnly: true, sameSite: false, secure: true });
  res.status(200);
  res.send('Authenticated');
}