
import { Schema, model } from 'mongoose';

export interface IIssueInfo {
  issuedBy: string
  returnDate: number
}

export interface IBook {
  metadata: string
  rackLocation: string
  issueInfo: IIssueInfo | null
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
  issueInfo: {
    type: Object,
    default: null,
  },
});

export const BookModel = model('Book', BookSchema, 'books');