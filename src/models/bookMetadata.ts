import { Schema, model } from 'mongoose';

export interface IBookMetadata {
  name: string,
  abstract: string,
  authors: string[],
  publication: string,
}

const BookMetadataSchema = new Schema<IBookMetadata>({
  name: {
    type: String,
    required: true,
  },
});

export const BookMetadataModel = model('BookMetadata', BookMetadataSchema, 'bookMetas');