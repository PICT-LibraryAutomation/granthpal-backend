
import { Schema, model } from 'mongoose';

export interface IUser {
  userType: string
  name: string
  email: string
  phone: string
  prn: string
  pendingFine: number
}

export const UserSchema = new Schema<IUser>({
  userType: {
    type: String,
    required: true,
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