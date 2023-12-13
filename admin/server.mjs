
import dotenv from 'dotenv';
import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import { broadcastDevReady } from '@remix-run/node';

import * as build from './build/index.js';

dotenv.config();

const app = express();
app.use(express.static('public'));

app.all('*', createRequestHandler({ build }));

app.listen(process.env.GRANTHPAL_ADMIN_PORT || 8080, () => {
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(build);
  }
  console.log(`Listening at http://localhost:${process.env.GRANTHPAL_ADMIN_PORT}`)
});