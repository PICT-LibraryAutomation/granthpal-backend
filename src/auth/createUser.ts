
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from '../models/user.js';
import { SessionModel } from '../models/session.js';

export async function createUser(req: Request, res: Response) {
  let sessionID = req.cookies['auth-session'];
  if (sessionID && sessionID != '') {
    res.status(400);
    res.send('Already Authenticated. Please logout first.');
    return;
  }
  sessionID = sessionID.trim();
  
  let name = req.body.name;
  let phone = req.body.phone;
  let password = req.body.password;

  if (!name || !phone || !password || name === '' || phone === '' || password === '') {
    res.status(400);
    res.send('Invalid details provided');
    return;
  }

  name = name.trim();
  phone = phone.trim();
  password = password.trim();

  let user = await UserModel.findOne({ phone });
  if (user != null) {
    res.status(400);
    res.send('User with given phone number already exists');
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