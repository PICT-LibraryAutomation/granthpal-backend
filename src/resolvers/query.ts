import { getAuthor, getAuthors, getBook, getBookMeta, getBookMetas, getBooks, getIssueInfo, getIssueInfos, getPublication, getPublications, getUser, getUsers } from '../db/getters.js';
import { QueryResolvers } from '../generated/graphql.js';
import { APIContext } from '../context.js';
import { GraphQLError } from 'graphql';

export const queryResolvers: QueryResolvers = {
  async users(_, __, ctx: APIContext) {
    return await getUsers({}, ctx);
  },
  async userByID(_, { id }, ctx: APIContext) {
    return await getUser({ _id: id }, ctx);
  },
  async userByPRN(_, { prn }, ctx: APIContext) {
    return await getUser({ prn }, ctx);
  },
  async currentUser(_, __, ctx: APIContext) {
    if (!ctx.auth.isAuth || !ctx.auth.UID) {
      throw new GraphQLError('User not authenticated');
    }

    const uid = ctx.auth.UID;
    return await getUser({ _id: uid }, ctx);
  },

  async books(_, __, ctx: APIContext) {
    return await getBooks({}, ctx);
  },
  async book(_, { id }, ctx: APIContext) {
    return await getBook({ _id: id }, ctx);
  },

  async bookMetas(_, __, ctx: APIContext) {
    return await getBookMetas({}, ctx);
  },
  async bookMeta(_, { id }, ctx: APIContext) {
    return await getBookMeta({ _id: id }, ctx);
  },

  async authors(_, __, ctx: APIContext) {
    return await getAuthors({}, ctx);
  },
  async author(_, { id }, ctx: APIContext) {
    return await getAuthor({ _id: id }, ctx);
  },

  async publications(_, __, ctx: APIContext) {
    return await getPublications({}, ctx);
  },
  async publication(_, { id }, ctx: APIContext) {
    return await getPublication({ _id: id }, ctx);
  },

  async issuedInfos(_, __, ctx: APIContext) {
    return await getIssueInfos({}, ctx);
  },
  async issuedInfo(_, { id }, ctx: APIContext) {
    return await getIssueInfo({ _id: id }, ctx);
  },
};