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
    prn: user.get('prn'),
    kind: user.get('kind'),
    name: user.get('name'),
    phone: user.get('phone'),
    issuing: getIssueInfos.bind(this, { issuedBy: user.get('prn'), status: IssueStatus.Borrowed }),
    allIssued: getIssueInfos.bind(this, { issuedBy: user.get('prn') }),
  };
};

export const getUsers = async (filter, ctx: APIContext) => {
  const users = await UserModel.find(filter);
  return users.map(user => ({
    id: user.id,
    prn: user.get('prn'),
    kind: user.get('kind'),
    name: user.get('name'),
    phone: user.get('phone'),
    issuing: getIssueInfos.bind(this, { issuedBy: user.get('prn'), status: IssueStatus.Borrowed }),
    allIssued: getIssueInfos.bind(this, { issuedBy: user.get('prn') }),
  }));
};

export const getAuthor = async (filter, ctx: APIContext) => {
  const author = await AuthorModel.findOne(filter);
  return !author ? null : {
    id: author.id,
    name: author.get('name'),
    books: getBookMetas.bind(this, { authors: author.id }),
  };
}

export const getAuthors = async (filter, ctx: APIContext) => {
  const authors = await AuthorModel.find(filter);
  return authors.map(author => ({
    id: author.id,
    name: author.get('name'),
    books: getBookMetas.bind(this, { authors: author.id }),
  }));
}

export const getPublication = async (filter, ctx: APIContext) => {
  const publication = await PublicationModel.findOne(filter);
  return !publication ? null : {
    id: publication.id,
    name: publication.get('name'),
    books: getBookMetas.bind(this, { publication: publication.id }),
  };
}

export const getPublications = async (filter, ctx: APIContext) => {
  const publications = await PublicationModel.find(filter);
  return publications.map(publication => ({
    id: publication.id,
    name: publication.get('name'),
    books: getBookMetas.bind(this, { publication: publication.id }),
  }));
}

export const getBook = async (filter, ctx: APIContext) => {
  const book = await BookModel.findOne(filter);
  return !book ? null : {
    id: book.id,
    meta: getBookMeta.bind(this, { _id: book.get('meta') }),
    issueInfo: getIssueInfo.bind(this, { book: book.id, status: IssueStatus.Borrowed }),
  };
}

export const getBooks = async (filter, ctx: APIContext) => {
  const books = await BookModel.find(filter);
  return books.map(book => ({
    id: book.id,
    meta: getBookMeta.bind(this, { _id: book.get('meta') }),
    issueInfo: getIssueInfo.bind(this, { book: book.id, status: IssueStatus.Borrowed }),
  }));
}

export const getBookMeta = async (filter, ctx: APIContext) => {
  const bookMeta = await BookMetadataModel.findOne(filter);
  return !bookMeta ? null : {
    id: bookMeta.id,
    name: bookMeta.get('name'),
    abstract: bookMeta.get('abstract'),
    authors: getAuthors.bind(this, { _id: { $in: bookMeta.get('authors') } }),
    publication: getPublication.bind(this, { _id: bookMeta.get('publication') }),
    books: getBooks.bind(this, { meta: bookMeta.id }),
  };
}

export const getBookMetas = async (filter, ctx: APIContext) => {
  const bookMetas = await BookMetadataModel.find(filter);
  return bookMetas.map(bookMeta => ({
    id: bookMeta.id,
    name: bookMeta.get('name'),
    abstract: bookMeta.get('abstract'),
    authors: getAuthors.bind(this, { _id: { $in: bookMeta.get('authors') } }),
    publication: getPublication.bind(this, { _id: bookMeta.get('publication') }),
    books: getBooks.bind(this, { meta: bookMeta.id }),
  }));
}

export const getIssueInfo = async (filter, ctx: APIContext) => {
  const issueInfo = await IssueInfoModel.findOne(filter);
  return !issueInfo ? null : {
    id: issueInfo.id,
    status: issueInfo.get('status'),
    issueDate: issueInfo.get('issueDate'),
    returnDate: issueInfo.get('returnDate'),
    finePayment: issueInfo.get('finePayment'),
    issuedBy: getUser.bind(this, { prn: issueInfo.get('issuedBy') }),
    book: getBook.bind(this, { _id: issueInfo.get('book') }),
  };
}

export const getIssueInfos = async (filter, ctx: APIContext) => {
  const issueInfos = await IssueInfoModel.find(filter);
  return issueInfos.map(issueInfo => ({
    id: issueInfo.id,
    status: issueInfo.get('status'),
    issueDate: issueInfo.get('issueDate'),
    returnDate: issueInfo.get('returnDate'),
    finePayment: issueInfo.get('finePayment'),
    issuedBy: getUser.bind(this, { prn: issueInfo.get('issuedBy') }),
    book: getBook.bind(this, { _id: issueInfo.get('book') }),
  }));
}