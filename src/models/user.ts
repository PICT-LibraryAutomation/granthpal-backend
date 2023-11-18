
import { Schema, model } from 'mongoose';
import { UserType } from 'granthpal-common';

export interface IUser {
  user_type: string
  name: string
  email: string
  phone: string
  prn: string
  pendingFine: number
}

export const UserSchema = new Schema<IUser>({
  user_type: {
    type: UserType,
    default: UserType.STUDENT,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  prn: {
    type: String,
    required: true,
  },
  pendingFine: {
    type: Number,
    default: 0,
  },
});

export const UserModel = model('User', UserSchema, 'users');