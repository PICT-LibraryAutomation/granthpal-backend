/* eslint-disable @typescript-eslint/no-unused-vars */

import { UserType } from 'granthpal-common';
import { APIContext } from '../context.js';
import { getUsers } from '../utils.js';

export const userResolvers = {
  queries: {
    async users(_parent, _args, _ctx: APIContext, _info) {
      return await getUsers({});
    },
    async students(_parent, _args, _ctx: APIContext, _info) {
      return await getUsers({ userType: UserType.STUDENT });
    },
    async faculty(_parent, _args, _ctx: APIContext, _info) {
      return await getUsers({ userType: UserType.FACULTY });
    },
    async libraryStaff(_parent, _args, _ctx: APIContext, _info) {
      return await getUsers({ userType: UserType.LIBRARY_STAFF });
    },
  },
};