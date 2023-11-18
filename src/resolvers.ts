
import { UserType } from 'granthpal-common';
import { DateScalar } from './resolvers/date.js';

import { userResolvers } from './resolvers/user.js';
import { bookResolvers } from './resolvers/book.js';
import { authorResolvers } from './resolvers/author.js';
import { publicationResolvers } from './resolvers/publication.js';

export const resolvers = {
  Date: DateScalar,
  UserType: UserType,

  Query: {
    ...userResolvers.queries,
    ...bookResolvers.queries,
    ...authorResolvers.queries,
    ...publicationResolvers.queries,
  },
};