import { Schema, model } from 'mongoose';

export interface ISession {
  uid: string,
  loggedIn: Date,
}

const SessionSchema = new Schema<ISession>({
  uid: {
    type: String,
    required: true,
  },
  loggedIn: {
    type: Date,
    required: true,
  },
});

export const SessionModel = model('Session', SessionSchema, 'sessions');