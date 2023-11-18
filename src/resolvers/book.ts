/* eslint-disable @typescript-eslint/no-unused-vars */

import { APIContext } from '../context.js';
import { getBooks } from '../utils.js';

export const bookResolvers = {
  queries: {
    async books(_parent, _args, _ctx: APIContext, _info) {
      return await getBooks({});
    },
  },
};