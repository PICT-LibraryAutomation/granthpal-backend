import { APIContext } from '../context.js';
import { IssueStatus } from '../generated/graphql.js';
import { UserModel } from './models/user.js';
import { AuthorModel } from './models/author.js';
import { PublicationModel } from './models/publication.js';
import { BookModel } from './models/book.js';
import { BookMetadataModel } from './models/bookMetadata.js';
import { IssueInfoModel } from './models/issueInfo.js';

export const getUser = async (filter, ctx: APIContext) => {
  const user = await UserModel.findOne(filter);
  return !user ? null : {
    id: user.id,
    prn: user.prn,
    kind: user.kind,
    name: user.name,
    phone: user.phone,
    issuing: getIssueInfos.bind(this, { issuedBy: user.id, status: IssueStatus.Borrowed }),
    allIssued: getIssueInfos.bind(this, { issuedBy: user.id }),
  };
};

export const getUsers = async (filter, ctx: APIContext) => {
  const users = await UserModel.find(filter);
  return users.length === 0 ? [] : users.map(user => ({
    id: user.id,
    prn: user.prn,
    kind: user.kind,
    name: user.name,
    phone: user.phone,
    issuing: getIssueInfos.bind(this, { issuedBy: user.id, status: IssueStatus.Borrowed }),
    allIssued: getIssueInfos.bind(this, { issuedBy: user.id }),
  }));
};

export const getAuthor = async (filter, ctx: APIContext) => {
  const author = await AuthorModel.findOne(filter);
  return !author ? null : {
    id: author.id,
    name: author.name,
    books: getBooks.bind(this, { authors: author.id }),
  };
}

export const getAuthors = async (filter, ctx: APIContext) => {
  const authors = await AuthorModel.find(filter);
  return authors.length === 0 ? [] : authors.map(author => ({
    id: author.id,
    name: author.name,
    books: getBooks.bind(this, { authors: author.id }),
  }));
}

export const getPublication = async (filter, ctx: APIContext) => {
  const publication = await PublicationModel.findOne(filter);
  return !publication ? null : {
    id: publication.id,
    name: publication.name,
    books: getBookMetas.bind(this, { publication: publication.id }),
  };
}

export const getPublications = async (filter, ctx: APIContext) => {
  const publications = await PublicationModel.find(filter);
  return publications.length === 0 ? [] : publications.map(publication => ({
    id: publication.id,
    name: publication.name,
    books: getBookMetas.bind(this, { publication: publication.id }),
  }));
}

export const getBook = async (filter, ctx: APIContext) => {
  const book = await BookModel.findOne(filter);
  return !book ? null : {
    id: book.id,
    meta: getBookMeta.bind(this, { _id: book.id }),
    issueInfo: book.issueInfo ? getIssueInfo.bind(this, { _id: book.issueInfo }) : null,
  };
}

export const getBooks = async (filter, ctx: APIContext) => {
  const books = await BookModel.find(filter);
  return books.length === 0 ? [] : books.map(book => ({
    id: book.id,
    meta: getBookMeta.bind(this, { _id: book.id }),
    issueInfo: book.issueInfo ? getIssueInfo.bind(this, { _id: book.issueInfo }) : null,
  }));
}

export const getBookMeta = async (filter, ctx: APIContext) => {
  const bookMeta = await BookMetadataModel.findOne(filter);
  return !bookMeta ? null : {
    id: bookMeta.id,
    name: bookMeta.name,
    abstract: bookMeta.abstract,
    authors: getAuthors.bind(this, { _id: { $in: bookMeta.authors } }),
    publication: getPublication.bind(this, { _id: bookMeta.publication }),
    books: getBooks.bind(this, { meta: bookMeta.id }),
  };
}

export const getBookMetas = async (filter, ctx: APIContext) => {
  const bookMetas = await BookMetadataModel.find(filter);
  return bookMetas.length === 0 ? [] : bookMetas.map(bookMeta => ({
    id: bookMeta.id,
    name: bookMeta.name,
    abstract: bookMeta.abstract,
    authors: getAuthors.bind(this, { _id: { $in: bookMeta.authors } }),
    publication: getPublication.bind(this, { _id: bookMeta.publication }),
    books: getBooks.bind(this, { meta: bookMeta.id }),
  }));
}

export const getIssueInfo = async (filter, ctx: APIContext) => {
  const issueInfo = await IssueInfoModel.findOne(filter);
  return !issueInfo ? null : {
    id: issueInfo.id,
    status: issueInfo.status,
    issueDate: issueInfo.issueDate,
    returnDate: issueInfo.returnDate,
    finePayment: issueInfo.finePayment,
    issuedBy: getUser.bind(this, { _id: issueInfo.issuedBy }),
    book: getBook.bind(this, { _id: issueInfo.book }),
  };
}

export const getIssueInfos = async (filter, ctx: APIContext) => {
  const issueInfos = await IssueInfoModel.find(filter);
  return issueInfos.length === 0 ? [] : issueInfos.map(issueInfo => ({
    id: issueInfo.id,
    status: issueInfo.status,
    issueDate: issueInfo.issueDate,
    returnDate: issueInfo.returnDate,
    finePayment: issueInfo.finePayment,
    issuedBy: getUser.bind(this, { _id: issueInfo.issuedBy }),
    book: getBook.bind(this, { _id: issueInfo.book }),
  }));
}