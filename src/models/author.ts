
import { Schema, model } from 'mongoose';

export interface IAuthor {
  name: string
  books: string[]
}

export const AuthorSchema = new Schema<IAuthor>({
  name: {
    type: String,
    required: true,
  },
  books: {
    type: [String],
    default: [],
  },
});

export const AuthorModel = model('Author', AuthorSchema, 'authors');