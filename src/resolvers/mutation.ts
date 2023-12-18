
import moment from 'moment';
import { GraphQLError } from 'graphql';
import { APIContext } from '../context.js';
import { IssueStatus, MutationResolvers, UserKind } from '../generated/graphql.js';
import { setGranthpalSettings, getGranthpalSettings } from '../local/models/settings.js';
import { Errors } from '../errors.js';
import { BookMetadataModel } from '../remote/models/bookMetadata.js';
import { BookModel } from '../remote/models/book.js';
import * as remoteGetters from '../remote/getters.js';
import { IssueInfoModel } from '../remote/models/issueInfo.js';
import { UserModel } from '../remote/models/user.js';

export const mutationResolvers: MutationResolvers = {
  setIssuePeriod(_, { period }) {
    return setGranthpalSettings({
      issuePeriod: period,
      ...getGranthpalSettings(),
    });
  },

  async addBookToInventory(_, { inp: { meta } }, ctx: APIContext) {
    if (!ctx.auth.isAuth || !ctx.auth.UID) {
      throw new GraphQLError(Errors.USER_UNAUTHENTICATED);
    }

    const user = await ctx.auth.getUserData();
    if (user.kind != UserKind.LibraryStaff) {
      throw new GraphQLError(Errors.NOT_ENOUGH_RIGHTS);
    }

    const bookMeta = await BookMetadataModel.exists({ _id: meta });
    if (!bookMeta) {
      throw new GraphQLError(Errors.BOOK_METADATA_DOESNT_EXIST);
    }

    const bookDoc = new BookModel({ meta });
    const book = await bookDoc.save();

    return await remoteGetters.getBook({ _id: book.id }, ctx);
  },

  async registerBookMetadata(_, { inp }, ctx: APIContext) {
    if (!ctx.auth.isAuth || !ctx.auth.UID) {
      throw new GraphQLError(Errors.USER_UNAUTHENTICATED);
    }

    const user = await ctx.auth.getUserData();
    if (user.kind != UserKind.LibraryStaff) {
      throw new GraphQLError(Errors.NOT_ENOUGH_RIGHTS);
    }

    const bookMetaDoc = new BookMetadataModel({
      name: inp.name,
      abstract: inp.abstract,
      authors: inp.authors,
      publication: inp.publication,
    });
    const bookMeta = await bookMetaDoc.save();

    return remoteGetters.getBookMeta({ _id: bookMeta.id }, ctx);
  },

  async returnBook(_, { inp }, ctx: APIContext) {
    if (!ctx.auth.isAuth || !ctx.auth.UID) {
      throw new GraphQLError(Errors.USER_UNAUTHENTICATED);
    }

    const user = await ctx.auth.getUserData();
    if (user.kind != UserKind.LibraryStaff) {
      throw new GraphQLError(Errors.NOT_ENOUGH_RIGHTS);
    }

    const issueInfoDoc = await IssueInfoModel.findOne({ book: inp.bookID, issueBy: inp.prn });
    if (!issueInfoDoc) {
      throw new GraphQLError(Errors.ISSUE_INFO_DOESNT_EXIST);
    }

    const daysSinceReturnDate = moment.duration(moment().diff(moment(issueInfoDoc.returnDate))).asDays();
    await issueInfoDoc.updateOne({ status: IssueStatus.Returned, finePayment: daysSinceReturnDate * getGranthpalSettings().fineAmount });
    return await remoteGetters.getIssueInfo({ _id: issueInfoDoc.id }, ctx);
  },

  async issueBook(_, { inp }, ctx: APIContext) {
    if (!ctx.auth.isAuth || !ctx.auth.UID) {
      throw new GraphQLError(Errors.USER_UNAUTHENTICATED);
    }

    const user = await ctx.auth.getUserData();
    if (user.kind != UserKind.LibraryStaff) {
      throw new GraphQLError(Errors.NOT_ENOUGH_RIGHTS);
    }

    const bookDoc = await BookModel.findById(inp.bookID);
    const userDoc = await UserModel.findOne({ prn: inp.prn });

    if (!bookDoc) {
      throw new GraphQLError(Errors.BOOK_DOESNT_EXIST);
    }

    if (!userDoc) {
      throw new GraphQLError(Errors.USER_DOESNT_EXIST);
    }

    const issuePeriod = inp.issuePeriod || getGranthpalSettings().issuePeriod;
    const issueInfoDoc = new IssueInfoModel({
      book: inp.bookID,
      status: IssueStatus.Borrowed,
      issuedBy: inp.prn,
      issueDate: moment().toDate(),
      returnDate: moment().add(issuePeriod, 'days').endOf('day').toDate(),
      finePayment: 0,
    });
    const issueInfo = await issueInfoDoc.save();

    return remoteGetters.getIssueInfo({ _id: issueInfo.id }, ctx);
  }
};