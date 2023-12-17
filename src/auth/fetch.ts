
import { Request } from 'express';
import { SessionModel } from '../models/session.js';
import { UserModel } from '../models/user.js';

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
    UID: session.uid,
    loggedIn: session.loggedIn,
    getUserData: async () => {
      const user = await UserModel.findById(session.uid);
      return !user ? null : {
        id: user.id,
        prn: user.prn,
        kind: user.kind,
        name: user.name,
        phone: user.phone,
      };
    },
  };
}