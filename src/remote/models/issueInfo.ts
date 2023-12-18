import { Schema, model } from 'mongoose';
import { IssueStatus } from '../../generated/graphql.js';

export interface IIssueInfo {
  status: IssueStatus,
  book: string,
  issuedBy: string,
  issueDate: Date,
  returnDate: Date,
  finePayment: number,
}

const IssueInfoSchema = new Schema<IIssueInfo>({
  status: {
    type: String,
    required: true,
  },
  book: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  finePayment: {
    type: Number,
    required: true,
  },
});

export const IssueInfoModel = model('IssueInfo', IssueInfoSchema, 'issueInfos');