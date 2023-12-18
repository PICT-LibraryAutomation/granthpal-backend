import { Schema, model } from 'mongoose';
import { UserKind } from '../../generated/graphql.js';

export interface IUser {
  prn: string,
  passwordHash: string,
  kind: UserKind,
  name: string,
  phone: string,
}

const UserSchema = new Schema<IUser>({
  prn: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const UserModel = model('User', UserSchema, 'users');