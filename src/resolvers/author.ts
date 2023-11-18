/* eslint-disable @typescript-eslint/no-unused-vars */

import { APIContext } from '../context.js';
import { getAuthors } from '../utils.js';

export const authorResolvers = {
  queries: {
    async authors(_parent, _args, _ctx: APIContext, _info) {
      return await getAuthors({});
    },
  },
};