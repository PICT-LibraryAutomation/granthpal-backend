/* eslint-disable @typescript-eslint/no-unused-vars */

import { APIContext } from '../context.js';
import { getPublications } from '../utils.js';

export const publicationResolvers = {
  queries: {
    async publications(_parent, _args, _ctx: APIContext, _info) {
      return await getPublications({});
    },
  },
};