import { Resolvers } from './generated/graphql.js';
import { dateScalar } from './resolvers/date.js';
import { mutationResolvers } from './resolvers/mutation.js';
import { queryResolvers } from './resolvers/query.js';

export const resolvers: Resolvers = {
  Date: dateScalar,
  Query: queryResolvers,
  Mutation: mutationResolvers,
};