import { Schema, model } from 'mongoose';

export interface IBook {
  meta: string,
  issueInfo: string,
}

const BookSchema = new Schema<IBook>({
  meta: {
    type: String,
    required: true,
  },
  issueInfo: {
    type: String,
    required: false,
  },
});

export const BookModel = model('Book', BookSchema, 'books');