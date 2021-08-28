import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `ID` scalar type represents a unique MongoDB identifier in collection. MongoDB by default use 12-byte ObjectId value (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB also may accepts string or integer as correct values for _id field. */
  MongoID: any;
  /** The string representation of JavaScript regexp. You may provide it with flags "/^abc.*\/i" or without flags like "^abc.*". More info about RegExp characters and flags: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
  RegExpAsString: any;
};

export type Bookmark = EntryInterface & {
  __typename?: 'Bookmark';
  _id: Scalars['MongoID'];
  kind?: Maybe<EnumDKeyEntryKind>;
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  viewId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  isDeleted: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  url: Scalars['String'];
  linkData?: Maybe<BookmarkLinkData>;
  workspace?: Maybe<Workspace>;
};

export type BookmarkLinkData = {
  __typename?: 'BookmarkLinkData';
  title?: Maybe<Scalars['String']>;
  hostname?: Maybe<Scalars['String']>;
  faviconUrl?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['MongoID']>;
};

export type BookmarkLinkDataInput = {
  title?: Maybe<Scalars['String']>;
  hostname?: Maybe<Scalars['String']>;
  faviconUrl?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['MongoID']>;
};

export type Calender = ViewInterface & {
  __typename?: 'Calender';
  _id: Scalars['MongoID'];
  kind?: Maybe<EnumDKeyViewKind>;
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  dateFormat?: Maybe<Scalars['String']>;
  timeFormat?: Maybe<Scalars['String']>;
  primaryTZ?: Maybe<Scalars['String']>;
  secondaryTZ?: Maybe<Scalars['String']>;
  weekStart?: Maybe<Scalars['String']>;
  workspace?: Maybe<Workspace>;
};

export type CreateOneBookmarkInput = {
  workspaceId: Scalars['MongoID'];
  viewId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  url: Scalars['String'];
  linkData?: Maybe<BookmarkLinkDataInput>;
};

export type CreateOneBookmarkPayload = {
  __typename?: 'CreateOneBookmarkPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Bookmark>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneCalenderInput = {
  workspaceId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  dateFormat?: Maybe<Scalars['String']>;
  timeFormat?: Maybe<Scalars['String']>;
  primaryTZ?: Maybe<Scalars['String']>;
  secondaryTZ?: Maybe<Scalars['String']>;
  weekStart?: Maybe<Scalars['String']>;
};

export type CreateOneCalenderPayload = {
  __typename?: 'CreateOneCalenderPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Calender>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneListViewInput = {
  workspaceId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  filterProperties?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateOneListViewPayload = {
  __typename?: 'CreateOneListViewPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<ListView>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneNoteInput = {
  workspaceId: Scalars['MongoID'];
  viewId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  content?: Maybe<Scalars['String']>;
};

export type CreateOneNotePayload = {
  __typename?: 'CreateOneNotePayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Note>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneWorkspaceInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  emoji?: Maybe<WorkspaceEmojiInput>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type CreateOneWorkspacePayload = {
  __typename?: 'CreateOneWorkspacePayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Workspace>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};


export type Entry = EntryInterface & {
  __typename?: 'Entry';
  _id: Scalars['MongoID'];
  kind?: Maybe<EnumDKeyEntryKind>;
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  viewId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  isDeleted: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  workspace?: Maybe<Workspace>;
};

export type EntryInterface = {
  _id: Scalars['MongoID'];
  kind?: Maybe<EnumDKeyEntryKind>;
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  viewId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  isDeleted: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  workspace?: Maybe<Workspace>;
};

/** List of items with pagination. */
export type EntryPagination = {
  __typename?: 'EntryPagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']>;
  /** Array of objects. */
  items?: Maybe<Array<Maybe<EntryInterface>>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export enum EnumDKeyEntryKind {
  Bookmark = 'Bookmark',
  Note = 'Note'
}

export enum EnumDKeyViewKind {
  Calender = 'Calender',
  ListView = 'ListView'
}

export type ErrorInterface = {
  /** Generic error message */
  message?: Maybe<Scalars['String']>;
};

export type FilterFindManyBookmarkInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  viewId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  url?: Maybe<Scalars['String']>;
  linkData?: Maybe<FilterFindManyBookmarkLinkDataInput>;
  OR?: Maybe<Array<FilterFindManyEntryInput>>;
  AND?: Maybe<Array<FilterFindManyEntryInput>>;
};

export type FilterFindManyBookmarkLinkDataInput = {
  title?: Maybe<Scalars['String']>;
  hostname?: Maybe<Scalars['String']>;
  faviconUrl?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['MongoID']>;
};

export type FilterFindManyCalenderInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  dateFormat?: Maybe<Scalars['String']>;
  timeFormat?: Maybe<Scalars['String']>;
  primaryTZ?: Maybe<Scalars['String']>;
  secondaryTZ?: Maybe<Scalars['String']>;
  weekStart?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<FilterFindManyViewInput>>;
  AND?: Maybe<Array<FilterFindManyViewInput>>;
};

export type FilterFindManyEntryInput = {
  userId?: Maybe<Scalars['MongoID']>;
  workspaceId?: Maybe<Scalars['MongoID']>;
  viewId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  kind?: Maybe<EnumDKeyEntryKind>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyEntryOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyEntryInput>>;
  AND?: Maybe<Array<FilterFindManyEntryInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyEntryOperatorsInput = {
  _id?: Maybe<FilterFindManyEntry_IdOperatorsInput>;
};

export type FilterFindManyEntry_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyListViewInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  OR?: Maybe<Array<FilterFindManyViewInput>>;
  AND?: Maybe<Array<FilterFindManyViewInput>>;
};

export type FilterFindManyNoteInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  viewId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  content?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<FilterFindManyEntryInput>>;
  AND?: Maybe<Array<FilterFindManyEntryInput>>;
};

export type FilterFindManyViewInput = {
  userId?: Maybe<Scalars['MongoID']>;
  workspaceId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  kind?: Maybe<EnumDKeyViewKind>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyViewOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyViewInput>>;
  AND?: Maybe<Array<FilterFindManyViewInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyViewOperatorsInput = {
  _id?: Maybe<FilterFindManyView_IdOperatorsInput>;
};

export type FilterFindManyView_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyWorkspaceEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type FilterFindManyWorkspaceInput = {
  userId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  emoji?: Maybe<FilterFindManyWorkspaceEmojiInput>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyWorkspaceOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyWorkspaceInput>>;
  AND?: Maybe<Array<FilterFindManyWorkspaceInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyWorkspaceOperatorsInput = {
  slug?: Maybe<FilterFindManyWorkspaceSlugOperatorsInput>;
  _id?: Maybe<FilterFindManyWorkspace_IdOperatorsInput>;
};

export type FilterFindManyWorkspaceSlugOperatorsInput = {
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['RegExpAsString']>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyWorkspace_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterUpdateOneWorkspaceInput = {
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterUpdateOneWorkspaceOperatorsInput>;
  OR?: Maybe<Array<FilterUpdateOneWorkspaceInput>>;
  AND?: Maybe<Array<FilterUpdateOneWorkspaceInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterUpdateOneWorkspaceOperatorsInput = {
  slug?: Maybe<FilterUpdateOneWorkspaceSlugOperatorsInput>;
  _id?: Maybe<FilterUpdateOneWorkspace_IdOperatorsInput>;
};

export type FilterUpdateOneWorkspaceSlugOperatorsInput = {
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['RegExpAsString']>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterUpdateOneWorkspace_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};


export type ListView = ViewInterface & {
  __typename?: 'ListView';
  _id: Scalars['MongoID'];
  kind?: Maybe<EnumDKeyViewKind>;
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  filterProperties?: Maybe<Array<Maybe<Scalars['String']>>>;
  workspace?: Maybe<Workspace>;
};

export type MongoError = ErrorInterface & {
  __typename?: 'MongoError';
  /** MongoDB error message */
  message?: Maybe<Scalars['String']>;
  /** MongoDB error code */
  code?: Maybe<Scalars['Int']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  /** Create one document with mongoose defaults, setters, hooks and validation */
  workspaceNew?: Maybe<CreateOneWorkspacePayload>;
  /** Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  workspaceUpdateOne?: Maybe<UpdateOneWorkspacePayload>;
  /** Soft delete a record */
  workspaceDeleteOne?: Maybe<Workspace>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createListView?: Maybe<CreateOneListViewPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createCalenderView?: Maybe<CreateOneCalenderPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createNote?: Maybe<CreateOneNotePayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createBookmark?: Maybe<CreateOneBookmarkPayload>;
};


export type MutationWorkspaceNewArgs = {
  record: CreateOneWorkspaceInput;
};


export type MutationWorkspaceUpdateOneArgs = {
  record: UpdateOneWorkspaceInput;
  filter?: Maybe<FilterUpdateOneWorkspaceInput>;
  sort?: Maybe<SortUpdateOneWorkspaceInput>;
  skip?: Maybe<Scalars['Int']>;
};


export type MutationWorkspaceDeleteOneArgs = {
  _id: Scalars['MongoID'];
};


export type MutationCreateListViewArgs = {
  record: CreateOneListViewInput;
};


export type MutationCreateCalenderViewArgs = {
  record: CreateOneCalenderInput;
};


export type MutationCreateNoteArgs = {
  record: CreateOneNoteInput;
};


export type MutationCreateBookmarkArgs = {
  record: CreateOneBookmarkInput;
};

export type Note = EntryInterface & {
  __typename?: 'Note';
  _id: Scalars['MongoID'];
  kind?: Maybe<EnumDKeyEntryKind>;
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  viewId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  isDeleted: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  content?: Maybe<Scalars['String']>;
  workspace?: Maybe<Workspace>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  currentPage: Scalars['Int'];
  perPage: Scalars['Int'];
  pageCount?: Maybe<Scalars['Int']>;
  itemCount?: Maybe<Scalars['Int']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  workspacePagination?: Maybe<WorkspacePagination>;
  workspaceMany: Array<Workspace>;
  viewsPagination?: Maybe<ViewPagination>;
  viewListViews: Array<ListView>;
  viewCalenderViews: Array<Calender>;
  entriesPagination?: Maybe<EntryPagination>;
  viewBookmarkEntries: Array<Bookmark>;
  viewNoteEntries: Array<Note>;
};


export type QueryWorkspacePaginationArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyWorkspaceInput>;
  sort?: Maybe<SortFindManyWorkspaceInput>;
};


export type QueryWorkspaceManyArgs = {
  filter?: Maybe<FilterFindManyWorkspaceInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyWorkspaceInput>;
};


export type QueryViewsPaginationArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyViewInput>;
  sort?: Maybe<SortFindManyViewInput>;
};


export type QueryViewListViewsArgs = {
  filter?: Maybe<FilterFindManyListViewInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyListViewInput>;
};


export type QueryViewCalenderViewsArgs = {
  filter?: Maybe<FilterFindManyCalenderInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyCalenderInput>;
};


export type QueryEntriesPaginationArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyEntryInput>;
  sort?: Maybe<SortFindManyEntryInput>;
};


export type QueryViewBookmarkEntriesArgs = {
  filter?: Maybe<FilterFindManyBookmarkInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyBookmarkInput>;
};


export type QueryViewNoteEntriesArgs = {
  filter?: Maybe<FilterFindManyNoteInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyNoteInput>;
};


export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export enum SortFindManyBookmarkInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyCalenderInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyEntryInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyListViewInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyNoteInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyViewInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyWorkspaceInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC'
}

export enum SortUpdateOneWorkspaceInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC'
}

export type UpdateOneWorkspaceEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type UpdateOneWorkspaceInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<UpdateOneWorkspaceEmojiInput>;
};

export type UpdateOneWorkspacePayload = {
  __typename?: 'UpdateOneWorkspacePayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Workspace>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type ValidationError = ErrorInterface & {
  __typename?: 'ValidationError';
  /** Combined error message from all validators */
  message?: Maybe<Scalars['String']>;
  /** List of validator errors */
  errors?: Maybe<Array<ValidatorError>>;
};

export type ValidatorError = {
  __typename?: 'ValidatorError';
  /** Validation error message */
  message?: Maybe<Scalars['String']>;
  /** Source of the validation error from the model path */
  path?: Maybe<Scalars['String']>;
  /** Field value which occurs the validation error */
  value?: Maybe<Scalars['JSON']>;
  /** Input record idx in array which occurs the validation error. This `idx` is useful for createMany operation. For singular operations it always be 0. For *Many operations `idx` represents record index in array received from user. */
  idx: Scalars['Int'];
};

export type View = ViewInterface & {
  __typename?: 'View';
  _id: Scalars['MongoID'];
  kind?: Maybe<EnumDKeyViewKind>;
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  workspace?: Maybe<Workspace>;
};

export type ViewInterface = {
  _id: Scalars['MongoID'];
  kind?: Maybe<EnumDKeyViewKind>;
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  workspace?: Maybe<Workspace>;
};

/** List of items with pagination. */
export type ViewPagination = {
  __typename?: 'ViewPagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']>;
  /** Array of objects. */
  items?: Maybe<Array<Maybe<ViewInterface>>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export type Workspace = {
  __typename?: 'Workspace';
  userId: Scalars['MongoID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  emoji?: Maybe<WorkspaceEmoji>;
  isDeleted: Scalars['Boolean'];
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type WorkspaceEmoji = {
  __typename?: 'WorkspaceEmoji';
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type WorkspaceEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

/** List of items with pagination. */
export type WorkspacePagination = {
  __typename?: 'WorkspacePagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']>;
  /** Array of objects. */
  items?: Maybe<Array<Workspace>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export type WorkspacesPaginationQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkspacesPaginationQuery = { __typename?: 'Query', workspacePagination?: Maybe<{ __typename?: 'WorkspacePagination', count?: Maybe<number>, pageInfo: { __typename?: 'PaginationInfo', currentPage: number, perPage: number, pageCount?: Maybe<number>, itemCount?: Maybe<number>, hasNextPage?: Maybe<boolean>, hasPreviousPage?: Maybe<boolean> }, items?: Maybe<Array<{ __typename?: 'Workspace', userId: any, title: string, description?: Maybe<string>, slug?: Maybe<string>, isDeleted: boolean, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }> }>> }> };

export type NewWorkspaceMutationVariables = Exact<{
  record: CreateOneWorkspaceInput;
}>;


export type NewWorkspaceMutation = { __typename?: 'Mutation', workspaceNew?: Maybe<{ __typename?: 'CreateOneWorkspacePayload', recordId?: Maybe<any>, record?: Maybe<{ __typename?: 'Workspace', userId: any, title: string, description?: Maybe<string>, slug?: Maybe<string>, isDeleted: boolean, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }> }> }> };

export type DeleteWorkspaceMutationVariables = Exact<{
  id: Scalars['MongoID'];
}>;


export type DeleteWorkspaceMutation = { __typename?: 'Mutation', workspaceDeleteOne?: Maybe<{ __typename?: 'Workspace', userId: any, title: string, description?: Maybe<string>, slug?: Maybe<string>, isDeleted: boolean, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }> }> };

export type UpdateWorkspaceMutationVariables = Exact<{
  filter: FilterUpdateOneWorkspaceInput;
  record: UpdateOneWorkspaceInput;
}>;


export type UpdateWorkspaceMutation = { __typename?: 'Mutation', workspaceUpdateOne?: Maybe<{ __typename?: 'UpdateOneWorkspacePayload', recordId?: Maybe<any>, record?: Maybe<{ __typename?: 'Workspace', userId: any, title: string, description?: Maybe<string>, slug?: Maybe<string>, isDeleted: boolean, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }> }> }> };

export type WorkspaceDataFragment = { __typename?: 'Workspace', userId: any, title: string, description?: Maybe<string>, slug?: Maybe<string>, isDeleted: boolean, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }> };

export const WorkspaceDataFragmentDoc = gql`
    fragment WorkspaceData on Workspace {
  userId
  title
  description
  slug
  emoji {
    emoji
    names
    unified
  }
  isDeleted
  _id
  updatedAt
  createdAt
}
    `;
export const WorkspacesPaginationDocument = gql`
    query WorkspacesPagination {
  workspacePagination {
    count
    pageInfo {
      currentPage
      perPage
      pageCount
      itemCount
      hasNextPage
      hasPreviousPage
    }
    items {
      ...WorkspaceData
    }
  }
}
    ${WorkspaceDataFragmentDoc}`;

export function useWorkspacesPaginationQuery(options: Omit<Urql.UseQueryArgs<WorkspacesPaginationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<WorkspacesPaginationQuery>({ query: WorkspacesPaginationDocument, ...options });
};
export const NewWorkspaceDocument = gql`
    mutation NewWorkspace($record: CreateOneWorkspaceInput!) {
  workspaceNew(record: $record) {
    recordId
    record {
      ...WorkspaceData
    }
  }
}
    ${WorkspaceDataFragmentDoc}`;

export function useNewWorkspaceMutation() {
  return Urql.useMutation<NewWorkspaceMutation, NewWorkspaceMutationVariables>(NewWorkspaceDocument);
};
export const DeleteWorkspaceDocument = gql`
    mutation DeleteWorkspace($id: MongoID!) {
  workspaceDeleteOne(_id: $id) {
    ...WorkspaceData
  }
}
    ${WorkspaceDataFragmentDoc}`;

export function useDeleteWorkspaceMutation() {
  return Urql.useMutation<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>(DeleteWorkspaceDocument);
};
export const UpdateWorkspaceDocument = gql`
    mutation UpdateWorkspace($filter: FilterUpdateOneWorkspaceInput!, $record: UpdateOneWorkspaceInput!) {
  workspaceUpdateOne(record: $record, filter: $filter) {
    recordId
    record {
      ...WorkspaceData
    }
  }
}
    ${WorkspaceDataFragmentDoc}`;

export function useUpdateWorkspaceMutation() {
  return Urql.useMutation<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument);
};