
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from '../remote/models/user.js';
import { SessionModel } from '../remote/models/session.js';
import { Errors } from '../errors.js';

export async function createUser(req: Request, res: Response) {
  let sessionID = req.cookies['auth-session'];
  if (sessionID && sessionID != '') {
    res.status(400);
    res.send(Errors.ALREADY_AUTHENTICATED);
    return;
  }
  sessionID = sessionID.trim();
  
  let name = req.body.name;
  let phone = req.body.phone;
  let password = req.body.password;

  if (!name || !phone || !password || name === '' || phone === '' || password === '') {
    res.status(400);
    res.send(Errors.INVALID_DETAILS_PROVIDED);
    return;
  }

  name = name.trim();
  phone = phone.trim();
  password = password.trim();

  let user = await UserModel.findOne({ phone });
  if (user != null) {
    res.status(400);
    res.send(Errors.INVALID_DETAILS_PROVIDED);
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const userDoc = new UserModel({
    name,
    passwordHash,
    phone,
    verified: false,
    clgID: '',
  });
  user = await userDoc.save();

  const sessionDoc = new SessionModel({
    uid: user.id,
    loggedIn: Date.now(),   
  });
  const session = await sessionDoc.save();

  res.cookie('auth-session', session.id, { httpOnly: true, sameSite: false, secure: true });
  res.status(200);
  res.send('Created and authenticated');
}