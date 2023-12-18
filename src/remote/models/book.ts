import { Schema, model } from 'mongoose';

export interface IBook {
  meta: string,
}

const BookSchema = new Schema<IBook>({
  meta: {
    type: String,
    required: true,
  },
});

export const BookModel = model('Book', BookSchema, 'books');