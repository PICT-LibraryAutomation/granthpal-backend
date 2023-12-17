
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from '../models/user.js';
import { SessionModel } from '../models/session.js';

export async function login(req: Request, res: Response) {
  const sessionID = req.cookies['auth-session'];
  if (sessionID && sessionID != '') {
    res.status(400);
    res.send('Already Authenticated. Please logout first.');
    return;
  }

  let phone: string = req.body.phone;
  let password: string = req.body.password;

  if (!phone || !password || phone === '' || password === '') {
    res.status(400);
    res.send('Phone or password not provided');
    return;
  }

  phone = phone.trim();
  password = password.trim();

  const user = await UserModel.findOne({ phone });
  if (!user) {
    res.status(400);
    res.send('User with given phone number doesn\'t exist');
    return;
  }

  if (!bcrypt.compareSync(password, user.passwordHash)) {
    res.status(400);
    res.send('Incorrect password provided');
    return;
  }

  const sessionDoc = new SessionModel({
    uid: user.id,
    loggedIn: Date.now(),
  });
  const session = await sessionDoc.save();

  res.cookie('auth-session', session.id, { httpOnly: true, sameSite: false, secure: true });
  res.status(200);
  res.send('Authenticated');
}