
import { Schema, model } from 'mongoose';

export interface IPublication {
  name: string
  books: string[]
}

export const PublicationSchema = new Schema<IPublication>({
  name: {
    type: String,
    required: true,
  },
  books: {
    type: [String],
    default: [],
  },
});

export const PublicationModel = model('Publication', PublicationSchema, 'publications');