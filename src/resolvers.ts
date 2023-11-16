
import { UserType } from 'granthpal-common';
import { DateScalar } from './resolvers/date.js';

export const resolvers = {
  Date: DateScalar,
  UserType: UserType,

  Query: {},
};