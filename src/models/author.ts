import { Schema, model } from 'mongoose';

export interface IAuthor {
  name: string,
}

const AuthorSchema = new Schema<IAuthor>({
  name: {
    type: String,
    required: true,
  },
});

export const AuthorModel = model('Author', AuthorSchema, 'authors');