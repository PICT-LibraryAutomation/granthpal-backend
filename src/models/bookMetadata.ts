
import { Schema, model } from 'mongoose';

export interface IBookMetadata {
  name: string
  authors: string[]
  publication: string
}

export const BookMetadataSchema = new Schema<IBookMetadata>({
  name: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    default: [],
  },
  publication: {
    type: String,
    required: true,
  },
});

export const BookMetadataModel = model('BookMetadata', BookMetadataSchema, 'book_metadata');