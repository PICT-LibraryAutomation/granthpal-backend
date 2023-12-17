import { Schema, model } from 'mongoose';

export interface IPublication {
  name: string,
}

const PublicationSchema = new Schema<IPublication>({
  name: {
    type: String,
    required: true,
  },
});

export const PublicationModel = model('Publication', PublicationSchema, 'publications');