import { AuthorModel } from './models/author.js';
import { BookModel } from './models/book.js';
import { BookMetadataModel } from './models/bookMetadata.js';
import { PublicationModel } from './models/publication.js';
import { UserModel } from './models/user.js';

export const getUsers = async filter => {
  const users = await UserModel.find(filter);
  return await users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    prn: user.prn,
    pendingFine: user.pendingFine,
    issuedBook: getBook.bind(this, { issuedBy: user.id }),
  }));
};

export const getUser = async filter => {
  const user = await UserModel.findOne(filter);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    prn: user.prn,
    pendingFine: user.pendingFine,
    issuedBook: getBook.bind(this, { issuedBy: user.id }),
  };
};

export const getBooks = async filter => {
  const books = await BookModel.find(filter);
  return books.map(book => ({
    id: book.id,
    rackLocation: book.rackLocation,
    metadata: getBookMetadata.bind(this, { _id: book.metadata }),
    issuedBy: getUser.bind(this, { _id: book.issuedBy }),
    issueDate: book.issueDate,
    returnDate: book.returnDate,
  }));
};

export const getBook = async filter => {
  const book = await BookModel.findOne(filter);
  return {
    id: book.id,
    rackLocation: book.rackLocation,
    metadata: getBookMetadata.bind(this, { _id: book.metadata }),
    issuedBy: getUser.bind(this, { _id: book.issuedBy }),
    issueDate: book.issueDate,
    returnDate: book.returnDate,
  };
};

export const getBookMetadatas = async filter => {
  const bookMetadatas = await BookMetadataModel.find(filter);
  return bookMetadatas.map(bookMetadata => ({
    id: bookMetadata.id,
    name: bookMetadata.name,
    authors: getAuthors.bind(this, { _id: { $in: bookMetadata.authors }, }),
    publication: getPublication.bind(this, { _id: bookMetadata.publication }),
  }));
};

export const getBookMetadata = async filter => {
  const bookMetadata = await BookMetadataModel.findOne(filter);
  return {
    id: bookMetadata.id,
    name: bookMetadata.name,
    authors: getAuthors.bind(this, { _id: { $in: bookMetadata.authors }, }),
    publication: getPublication.bind(this, { _id: bookMetadata.publication }),
  };
};

export const getAuthors = async filter => {
  const authors = await AuthorModel.find(filter);
  return authors.map(author => ({
    id: author.id,
    name: author.name,
    books: getBooks.bind(this, { authors: author.id }),
  }));
};

export const getAuthor = async filter => {
  const author = await AuthorModel.findOne(filter);
  return {
    id: author.id,
    name: author.name,
    books: getBooks.bind(this, { authors: author.id }),
  };
};

export const getPublications = async filter => {
  const publications = await PublicationModel.find(filter);
  return publications.map(publication => ({
    id: publication.id,
    name: publication.name,
    books: getBooks.bind(this, { publication: publication.id }),
  }));
};

export const getPublication = async filter => {
  const publication = await PublicationModel.findOne(filter);
  return {
    id: publication.id,
    name: publication.name,
    books: getBooks.bind(this, { publication: publication.id }),
  };
};