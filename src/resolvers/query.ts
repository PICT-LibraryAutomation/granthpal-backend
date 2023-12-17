import { GraphQLError } from 'graphql';
import { QueryResolvers } from '../generated/graphql.js';
import { APIContext } from '../context.js';
import * as remoteGetters from '../remote/getters.js';
import { getGranthpalSettings } from '../local/models/settings.js';
import { Errors } from '../errors.js';

export const queryResolvers: QueryResolvers = {
  async users(_, __, ctx: APIContext) {
    return await remoteGetters.getUsers({}, ctx);
  },
  async userByID(_, { id }, ctx: APIContext) {
    return await remoteGetters.getUser({ _id: id }, ctx);
  },
  async userByPRN(_, { prn }, ctx: APIContext) {
    return await remoteGetters.getUser({ prn }, ctx);
  },
  async currentUser(_, __, ctx: APIContext) {
    if (!ctx.auth.isAuth || !ctx.auth.UID) {
      throw new GraphQLError(Errors.USER_UNAUTHENTICATED);
    }

    const uid = ctx.auth.UID;
    return await remoteGetters.getUser({ _id: uid }, ctx);
  },

  async books(_, __, ctx: APIContext) {
    return await remoteGetters.getBooks({}, ctx);
  },
  async book(_, { id }, ctx: APIContext) {
    return await remoteGetters.getBook({ _id: id }, ctx);
  },

  async bookMetas(_, __, ctx: APIContext) {
    return await remoteGetters.getBookMetas({}, ctx);
  },
  async bookMeta(_, { id }, ctx: APIContext) {
    return await remoteGetters.getBookMeta({ _id: id }, ctx);
  },

  async authors(_, __, ctx: APIContext) {
    return await remoteGetters.getAuthors({}, ctx);
  },
  async author(_, { id }, ctx: APIContext) {
    return await remoteGetters.getAuthor({ _id: id }, ctx);
  },

  async publications(_, __, ctx: APIContext) {
    return await remoteGetters.getPublications({}, ctx);
  },
  async publication(_, { id }, ctx: APIContext) {
    return await remoteGetters.getPublication({ _id: id }, ctx);
  },

  async issuedInfos(_, __, ctx: APIContext) {
    return await remoteGetters.getIssueInfos({}, ctx);
  },
  async issuedInfo(_, { id }, ctx: APIContext) {
    return await remoteGetters.getIssueInfo({ _id: id }, ctx);
  },

  settings() {
    return getGranthpalSettings();
  }
};