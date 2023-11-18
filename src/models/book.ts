
import { Schema, model } from 'mongoose';

export interface IBook {
  metadata: string
  rackLocation: string
  issuedBy: string | null
  issueDate: number | null
  returnDate: number | null
}

export const BookSchema = new Schema<IBook>({
  metadata: {
    type: String,
    required: true,
  },
  rackLocation: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    default: null,
  },
  issueDate: {
    type: Number,
    default: null,
  },
  returnDate: {
    type: Number,
    default: null,
  },
});

export const BookModel = model('Book', BookSchema, 'books');