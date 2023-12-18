
import { Request } from 'express';
import { SessionModel } from '../remote/models/session.js';
import { UserModel } from '../remote/models/user.js';

export interface IAuthUser {
  id: string,
  prn: string,
  kind: string,
  name: string,
  phone: string,
}

export interface AuthCtx {
  isAuth: boolean,
  sessionID?: string,
  UID?: string,
  PRN?: string,
  loggedIn?: Date,
  getUserData: () => Promise<IAuthUser | null>,
}

export async function fetchAuthCtx(req: Request): Promise<AuthCtx> {
  let sessionID = req.cookies['auth-session'];
  if (!sessionID || sessionID === '') {
    return { isAuth: false, getUserData: async () => null };
  }
  sessionID = sessionID.trim();

  const session = await SessionModel.findById(sessionID);
  if (!session) {
    return { isAuth: false, getUserData: async () => null };
  }

  return {
    isAuth: true,
    sessionID: session.id,
    UID: session.get('uid'),
    PRN: session.get('prn'),
    loggedIn: session.get('loggedIn'),
    getUserData: async () => {
      const user = await UserModel.findById(session.get('uid'));
      return !user ? null : {
        id: user.id,
        prn: user.get('prn'),
        kind: user.get('kind'),
        name: user.get('name'),
        phone: user.get('phone'),
      };
    },
  };
}