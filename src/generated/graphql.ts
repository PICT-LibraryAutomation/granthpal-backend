import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AddBookToInventoryInput = {
  meta: Scalars['String']['input'];
};

export type Author = {
  __typename?: 'Author';
  books: Array<BookMetadata>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['String']['output'];
  issueInfo?: Maybe<IssueInfo>;
  meta: BookMetadata;
};

export type BookMetadata = {
  __typename?: 'BookMetadata';
  abstract: Scalars['String']['output'];
  authors: Array<Author>;
  books: Array<Book>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  publication?: Maybe<Publication>;
};

export type GranthpalSettings = {
  __typename?: 'GranthpalSettings';
  issuePeriod?: Maybe<Scalars['Int']['output']>;
};

export type IssueBookInput = {
  bookID: Scalars['String']['input'];
  issuePeriod?: InputMaybe<Scalars['Int']['input']>;
  prn: Scalars['String']['input'];
};

export type IssueInfo = {
  __typename?: 'IssueInfo';
  book: Book;
  finePayment: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  issueDate: Scalars['Date']['output'];
  issuedBy: User;
  returnDate: Scalars['Date']['output'];
  status: IssueStatus;
};

export enum IssueStatus {
  Borrowed = 'BORROWED',
  Returned = 'RETURNED'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBookToInventory: Book;
  issueBook: IssueInfo;
  registerBookMetadata: BookMetadata;
  renewBook: IssueInfo;
  returnBook: IssueInfo;
  setIssuePeriod: GranthpalSettings;
};


export type MutationAddBookToInventoryArgs = {
  inp: AddBookToInventoryInput;
};


export type MutationIssueBookArgs = {
  inp: IssueBookInput;
};


export type MutationRegisterBookMetadataArgs = {
  inp: RegisterBookMetadataInput;
};


export type MutationRenewBookArgs = {
  inp: RenewBookInput;
};


export type MutationReturnBookArgs = {
  inp: ReturnBookInput;
};


export type MutationSetIssuePeriodArgs = {
  period: Scalars['Int']['input'];
};

export type Publication = {
  __typename?: 'Publication';
  books: Array<BookMetadata>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  authors: Array<Author>;
  book?: Maybe<Book>;
  bookMeta?: Maybe<BookMetadata>;
  bookMetas: Array<BookMetadata>;
  books: Array<Book>;
  currentUser: User;
  issuedInfo?: Maybe<IssueInfo>;
  issuedInfos: Array<IssueInfo>;
  publication?: Maybe<Publication>;
  publications: Array<Publication>;
  settings: GranthpalSettings;
  userByID?: Maybe<User>;
  userByPRN?: Maybe<User>;
  users: Array<User>;
};


export type QueryAuthorArgs = {
  id: Scalars['String']['input'];
};


export type QueryBookArgs = {
  id: Scalars['String']['input'];
};


export type QueryBookMetaArgs = {
  id: Scalars['String']['input'];
};


export type QueryIssuedInfoArgs = {
  id: Scalars['String']['input'];
};


export type QueryPublicationArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserByPrnArgs = {
  prn: Scalars['String']['input'];
};

export type RegisterBookMetadataInput = {
  abstract: Scalars['String']['input'];
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  publication: Scalars['String']['input'];
};

export type RenewBookInput = {
  bookID: Scalars['String']['input'];
  issuePeriod?: InputMaybe<Scalars['Int']['input']>;
  prn: Scalars['String']['input'];
};

export type ReturnBookInput = {
  bookID: Scalars['String']['input'];
  prn: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  allIssued: Array<IssueInfo>;
  id: Scalars['String']['output'];
  issuing: Array<IssueInfo>;
  kind: UserKind;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  prn: Scalars['String']['output'];
};

export enum UserKind {
  Faculty = 'FACULTY',
  LibraryStaff = 'LIBRARY_STAFF',
  Student = 'STUDENT'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddBookToInventoryInput: AddBookToInventoryInput;
  Author: ResolverTypeWrapper<Author>;
  Book: ResolverTypeWrapper<Book>;
  BookMetadata: ResolverTypeWrapper<BookMetadata>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  GranthpalSettings: ResolverTypeWrapper<GranthpalSettings>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IssueBookInput: IssueBookInput;
  IssueInfo: ResolverTypeWrapper<IssueInfo>;
  IssueStatus: IssueStatus;
  Mutation: ResolverTypeWrapper<{}>;
  Publication: ResolverTypeWrapper<Publication>;
  Query: ResolverTypeWrapper<{}>;
  RegisterBookMetadataInput: RegisterBookMetadataInput;
  RenewBookInput: RenewBookInput;
  ReturnBookInput: ReturnBookInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserKind: UserKind;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddBookToInventoryInput: AddBookToInventoryInput;
  Author: Author;
  Book: Book;
  BookMetadata: BookMetadata;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  GranthpalSettings: GranthpalSettings;
  Int: Scalars['Int']['output'];
  IssueBookInput: IssueBookInput;
  IssueInfo: IssueInfo;
  Mutation: {};
  Publication: Publication;
  Query: {};
  RegisterBookMetadataInput: RegisterBookMetadataInput;
  RenewBookInput: RenewBookInput;
  ReturnBookInput: ReturnBookInput;
  String: Scalars['String']['output'];
  User: User;
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  books?: Resolver<Array<ResolversTypes['BookMetadata']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issueInfo?: Resolver<Maybe<ResolversTypes['IssueInfo']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['BookMetadata'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookMetadata'] = ResolversParentTypes['BookMetadata']> = {
  abstract?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  books?: Resolver<Array<ResolversTypes['Book']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GranthpalSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GranthpalSettings'] = ResolversParentTypes['GranthpalSettings']> = {
  issuePeriod?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['IssueInfo'] = ResolversParentTypes['IssueInfo']> = {
  book?: Resolver<ResolversTypes['Book'], ParentType, ContextType>;
  finePayment?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issueDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  issuedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  returnDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['IssueStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addBookToInventory?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationAddBookToInventoryArgs, 'inp'>>;
  issueBook?: Resolver<ResolversTypes['IssueInfo'], ParentType, ContextType, RequireFields<MutationIssueBookArgs, 'inp'>>;
  registerBookMetadata?: Resolver<ResolversTypes['BookMetadata'], ParentType, ContextType, RequireFields<MutationRegisterBookMetadataArgs, 'inp'>>;
  renewBook?: Resolver<ResolversTypes['IssueInfo'], ParentType, ContextType, RequireFields<MutationRenewBookArgs, 'inp'>>;
  returnBook?: Resolver<ResolversTypes['IssueInfo'], ParentType, ContextType, RequireFields<MutationReturnBookArgs, 'inp'>>;
  setIssuePeriod?: Resolver<ResolversTypes['GranthpalSettings'], ParentType, ContextType, RequireFields<MutationSetIssuePeriodArgs, 'period'>>;
};

export type PublicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Publication'] = ResolversParentTypes['Publication']> = {
  books?: Resolver<Array<ResolversTypes['BookMetadata']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryAuthorArgs, 'id'>>;
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<QueryBookArgs, 'id'>>;
  bookMeta?: Resolver<Maybe<ResolversTypes['BookMetadata']>, ParentType, ContextType, RequireFields<QueryBookMetaArgs, 'id'>>;
  bookMetas?: Resolver<Array<ResolversTypes['BookMetadata']>, ParentType, ContextType>;
  books?: Resolver<Array<ResolversTypes['Book']>, ParentType, ContextType>;
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  issuedInfo?: Resolver<Maybe<ResolversTypes['IssueInfo']>, ParentType, ContextType, RequireFields<QueryIssuedInfoArgs, 'id'>>;
  issuedInfos?: Resolver<Array<ResolversTypes['IssueInfo']>, ParentType, ContextType>;
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType, RequireFields<QueryPublicationArgs, 'id'>>;
  publications?: Resolver<Array<ResolversTypes['Publication']>, ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['GranthpalSettings'], ParentType, ContextType>;
  userByID?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>;
  userByPRN?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByPrnArgs, 'prn'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  allIssued?: Resolver<Array<ResolversTypes['IssueInfo']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issuing?: Resolver<Array<ResolversTypes['IssueInfo']>, ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['UserKind'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  prn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  BookMetadata?: BookMetadataResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GranthpalSettings?: GranthpalSettingsResolvers<ContextType>;
  IssueInfo?: IssueInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Publication?: PublicationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

