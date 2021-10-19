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

export type Collections = {
  __typename?: 'Collections';
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  type?: Maybe<EnumCollectionsType>;
  slug?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  title: Scalars['String'];
  emoji?: Maybe<CollectionsEmoji>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<CollectionsFields>>>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type CollectionsEmoji = {
  __typename?: 'CollectionsEmoji';
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type CollectionsEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type CollectionsFields = {
  __typename?: 'CollectionsFields';
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumCollectionsFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type CollectionsFieldsInput = {
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumCollectionsFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

/** List of items with pagination. */
export type CollectionsPagination = {
  __typename?: 'CollectionsPagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']>;
  /** Array of objects. */
  items?: Maybe<Array<Collections>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export type CreateOneCollectionsInput = {
  workspaceId: Scalars['MongoID'];
  type?: Maybe<EnumCollectionsType>;
  title: Scalars['String'];
  emoji?: Maybe<CollectionsEmojiInput>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<CollectionsFieldsInput>>>;
};

export type CreateOneCollectionsPayload = {
  __typename?: 'CreateOneCollectionsPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Collections>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneEntriesInput = {
  workspaceId: Scalars['MongoID'];
  collectionId: Scalars['MongoID'];
  title: Scalars['String'];
  emoji?: Maybe<EntriesEmojiInput>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<EntriesFieldsInput>>>;
};

export type CreateOneEntriesPayload = {
  __typename?: 'CreateOneEntriesPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Entries>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneTagsInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
};

export type CreateOneTagsPayload = {
  __typename?: 'CreateOneTagsPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Tags>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneWorkspaceInput = {
  emoji?: Maybe<WorkspaceEmojiInput>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<WorkspaceFieldsInput>>>;
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


export type Entries = {
  __typename?: 'Entries';
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  collectionId: Scalars['MongoID'];
  slug?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  title: Scalars['String'];
  emoji?: Maybe<EntriesEmoji>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<EntriesFields>>>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type EntriesEmoji = {
  __typename?: 'EntriesEmoji';
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type EntriesEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type EntriesFields = {
  __typename?: 'EntriesFields';
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumEntriesFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type EntriesFieldsInput = {
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumEntriesFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

/** List of items with pagination. */
export type EntriesPagination = {
  __typename?: 'EntriesPagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']>;
  /** Array of objects. */
  items?: Maybe<Array<Entries>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export enum EnumCollectionsFieldsKind {
  String = 'string',
  Date = 'date',
  Number = 'number',
  Link = 'link'
}

export enum EnumCollectionsType {
  Calender = 'calender',
  Kanban = 'kanban',
  List = 'list'
}

export enum EnumEntriesFieldsKind {
  String = 'string',
  Date = 'date',
  Number = 'number',
  Link = 'link'
}

export enum EnumWorkspaceFieldsKind {
  String = 'string',
  Date = 'date',
  Number = 'number',
  Link = 'link'
}

export type ErrorInterface = {
  /** Generic error message */
  message?: Maybe<Scalars['String']>;
};

export type FilterCountCollectionsEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type FilterCountCollectionsFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumCollectionsFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterCountCollectionsInput = {
  userId?: Maybe<Scalars['MongoID']>;
  workspaceId?: Maybe<Scalars['MongoID']>;
  type?: Maybe<EnumCollectionsType>;
  slug?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  emoji?: Maybe<FilterCountCollectionsEmojiInput>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FilterCountCollectionsFieldsInput>>>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterCountCollectionsOperatorsInput>;
  OR?: Maybe<Array<FilterCountCollectionsInput>>;
  AND?: Maybe<Array<FilterCountCollectionsInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountCollectionsOperatorsInput = {
  _id?: Maybe<FilterCountCollections_IdOperatorsInput>;
};

export type FilterCountCollections_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterCountEntriesEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type FilterCountEntriesFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumEntriesFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterCountEntriesInput = {
  userId?: Maybe<Scalars['MongoID']>;
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  slug?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  emoji?: Maybe<FilterCountEntriesEmojiInput>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<FilterCountEntriesFieldsInput>>>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterCountEntriesOperatorsInput>;
  OR?: Maybe<Array<FilterCountEntriesInput>>;
  AND?: Maybe<Array<FilterCountEntriesInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountEntriesOperatorsInput = {
  _id?: Maybe<FilterCountEntries_IdOperatorsInput>;
};

export type FilterCountEntries_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterCountTagsInput = {
  userId?: Maybe<Scalars['MongoID']>;
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterCountTagsOperatorsInput>;
  OR?: Maybe<Array<FilterCountTagsInput>>;
  AND?: Maybe<Array<FilterCountTagsInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountTagsOperatorsInput = {
  _id?: Maybe<FilterCountTags_IdOperatorsInput>;
};

export type FilterCountTags_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterCountWorkspaceEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type FilterCountWorkspaceFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumWorkspaceFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterCountWorkspaceInput = {
  userId?: Maybe<Scalars['MongoID']>;
  slug?: Maybe<Scalars['String']>;
  emoji?: Maybe<FilterCountWorkspaceEmojiInput>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FilterCountWorkspaceFieldsInput>>>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterCountWorkspaceOperatorsInput>;
  OR?: Maybe<Array<FilterCountWorkspaceInput>>;
  AND?: Maybe<Array<FilterCountWorkspaceInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountWorkspaceOperatorsInput = {
  slug?: Maybe<FilterCountWorkspaceSlugOperatorsInput>;
  _id?: Maybe<FilterCountWorkspace_IdOperatorsInput>;
};

export type FilterCountWorkspaceSlugOperatorsInput = {
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

export type FilterCountWorkspace_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyCollectionsFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumCollectionsFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterFindManyCollectionsInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  type?: Maybe<EnumCollectionsType>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FilterFindManyCollectionsFieldsInput>>>;
  OR?: Maybe<Array<FilterFindManyCollectionsInput>>;
  AND?: Maybe<Array<FilterFindManyCollectionsInput>>;
};

export type FilterFindManyEntriesFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumEntriesFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterFindManyEntriesInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<FilterFindManyEntriesFieldsInput>>>;
  OR?: Maybe<Array<FilterFindManyEntriesInput>>;
  AND?: Maybe<Array<FilterFindManyEntriesInput>>;
};

export type FilterFindManyTagsInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<FilterFindManyTagsInput>>;
  AND?: Maybe<Array<FilterFindManyTagsInput>>;
};

export type FilterFindManyWorkspaceFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumWorkspaceFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterFindManyWorkspaceInput = {
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FilterFindManyWorkspaceFieldsInput>>>;
  _id?: Maybe<Scalars['MongoID']>;
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

export type FilterFindOneWorkspaceFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumWorkspaceFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterFindOneWorkspaceInput = {
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FilterFindOneWorkspaceFieldsInput>>>;
  _id?: Maybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindOneWorkspaceOperatorsInput>;
  OR?: Maybe<Array<FilterFindOneWorkspaceInput>>;
  AND?: Maybe<Array<FilterFindOneWorkspaceInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneWorkspaceOperatorsInput = {
  slug?: Maybe<FilterFindOneWorkspaceSlugOperatorsInput>;
  _id?: Maybe<FilterFindOneWorkspace_IdOperatorsInput>;
};

export type FilterFindOneWorkspaceSlugOperatorsInput = {
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

export type FilterFindOneWorkspace_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterUpdateOneWorkspaceFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumWorkspaceFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterUpdateOneWorkspaceInput = {
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FilterUpdateOneWorkspaceFieldsInput>>>;
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
  workspaceCreateOne?: Maybe<CreateOneWorkspacePayload>;
  /** Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  workspaceUpdate?: Maybe<UpdateOneWorkspacePayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  collectionCreateOne?: Maybe<CreateOneCollectionsPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  collectionUpdateById?: Maybe<UpdateByIdCollectionsPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  EntryCreateOne?: Maybe<CreateOneEntriesPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  EntryUpdateById?: Maybe<UpdateByIdEntriesPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  TagCreateOne?: Maybe<CreateOneTagsPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  TagUpdateById?: Maybe<UpdateByIdTagsPayload>;
};


export type MutationWorkspaceCreateOneArgs = {
  record: CreateOneWorkspaceInput;
};


export type MutationWorkspaceUpdateArgs = {
  record: UpdateOneWorkspaceInput;
  filter?: Maybe<FilterUpdateOneWorkspaceInput>;
  sort?: Maybe<SortUpdateOneWorkspaceInput>;
  skip?: Maybe<Scalars['Int']>;
};


export type MutationCollectionCreateOneArgs = {
  record: CreateOneCollectionsInput;
};


export type MutationCollectionUpdateByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdCollectionsInput;
};


export type MutationEntryCreateOneArgs = {
  record: CreateOneEntriesInput;
};


export type MutationEntryUpdateByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdEntriesInput;
};


export type MutationTagCreateOneArgs = {
  record: CreateOneTagsInput;
};


export type MutationTagUpdateByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdTagsInput;
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
  workspaceFind: Array<Workspace>;
  workspaceById?: Maybe<Workspace>;
  workspaceOne?: Maybe<Workspace>;
  workspacePaginate?: Maybe<WorkspacePagination>;
  workspaceCount?: Maybe<Scalars['Int']>;
  collectionFind: Array<Collections>;
  collectionById?: Maybe<Collections>;
  collectionPaginate?: Maybe<CollectionsPagination>;
  collectionCount?: Maybe<Scalars['Int']>;
  EntryFind: Array<Entries>;
  EntryById?: Maybe<Entries>;
  EntryPaginate?: Maybe<EntriesPagination>;
  EntryCount?: Maybe<Scalars['Int']>;
  TagFind: Array<Tags>;
  TagById?: Maybe<Tags>;
  TagPaginate?: Maybe<TagsPagination>;
  TagCount?: Maybe<Scalars['Int']>;
};


export type QueryWorkspaceFindArgs = {
  filter?: Maybe<FilterFindManyWorkspaceInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyWorkspaceInput>;
};


export type QueryWorkspaceByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryWorkspaceOneArgs = {
  filter?: Maybe<FilterFindOneWorkspaceInput>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindOneWorkspaceInput>;
};


export type QueryWorkspacePaginateArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyWorkspaceInput>;
  sort?: Maybe<SortFindManyWorkspaceInput>;
};


export type QueryWorkspaceCountArgs = {
  filter?: Maybe<FilterCountWorkspaceInput>;
};


export type QueryCollectionFindArgs = {
  filter?: Maybe<FilterFindManyCollectionsInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyCollectionsInput>;
};


export type QueryCollectionByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryCollectionPaginateArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyCollectionsInput>;
  sort?: Maybe<SortFindManyCollectionsInput>;
};


export type QueryCollectionCountArgs = {
  filter?: Maybe<FilterCountCollectionsInput>;
};


export type QueryEntryFindArgs = {
  filter?: Maybe<FilterFindManyEntriesInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyEntriesInput>;
};


export type QueryEntryByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryEntryPaginateArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyEntriesInput>;
  sort?: Maybe<SortFindManyEntriesInput>;
};


export type QueryEntryCountArgs = {
  filter?: Maybe<FilterCountEntriesInput>;
};


export type QueryTagFindArgs = {
  filter?: Maybe<FilterFindManyTagsInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyTagsInput>;
};


export type QueryTagByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryTagPaginateArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyTagsInput>;
  sort?: Maybe<SortFindManyTagsInput>;
};


export type QueryTagCountArgs = {
  filter?: Maybe<FilterCountTagsInput>;
};


export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export enum SortFindManyCollectionsInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyEntriesInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyTagsInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyWorkspaceInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC'
}

export enum SortFindOneWorkspaceInput {
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

export type Tags = {
  __typename?: 'Tags';
  userId: Scalars['MongoID'];
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

/** List of items with pagination. */
export type TagsPagination = {
  __typename?: 'TagsPagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']>;
  /** Array of objects. */
  items?: Maybe<Array<Tags>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export type UpdateByIdCollectionsEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type UpdateByIdCollectionsFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumCollectionsFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type UpdateByIdCollectionsInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  type?: Maybe<EnumCollectionsType>;
  title?: Maybe<Scalars['String']>;
  emoji?: Maybe<UpdateByIdCollectionsEmojiInput>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<UpdateByIdCollectionsFieldsInput>>>;
};

export type UpdateByIdCollectionsPayload = {
  __typename?: 'UpdateByIdCollectionsPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Collections>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateByIdEntriesEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type UpdateByIdEntriesFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumEntriesFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type UpdateByIdEntriesInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  emoji?: Maybe<UpdateByIdEntriesEmojiInput>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<UpdateByIdEntriesFieldsInput>>>;
};

export type UpdateByIdEntriesPayload = {
  __typename?: 'UpdateByIdEntriesPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Entries>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateByIdTagsInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateByIdTagsPayload = {
  __typename?: 'UpdateByIdTagsPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Tags>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateOneWorkspaceEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type UpdateOneWorkspaceFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumWorkspaceFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type UpdateOneWorkspaceInput = {
  emoji?: Maybe<UpdateOneWorkspaceEmojiInput>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<UpdateOneWorkspaceFieldsInput>>>;
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

export type Workspace = {
  __typename?: 'Workspace';
  userId: Scalars['MongoID'];
  slug?: Maybe<Scalars['String']>;
  emoji?: Maybe<WorkspaceEmoji>;
  isDeleted: Scalars['Boolean'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<WorkspaceFields>>>;
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

export type WorkspaceFields = {
  __typename?: 'WorkspaceFields';
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumWorkspaceFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type WorkspaceFieldsInput = {
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumWorkspaceFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
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

export type WorkspacesPaginationQueryVariables = Exact<{
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type WorkspacesPaginationQuery = { __typename?: 'Query', workspacePaginate?: Maybe<{ __typename?: 'WorkspacePagination', count?: Maybe<number>, pageInfo: { __typename?: 'PaginationInfo', currentPage: number, perPage: number, pageCount?: Maybe<number>, itemCount?: Maybe<number>, hasNextPage?: Maybe<boolean>, hasPreviousPage?: Maybe<boolean> }, items?: Maybe<Array<{ __typename?: 'Workspace', _id: any, userId: any, slug?: Maybe<string>, isDeleted: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, title: string, description?: Maybe<string>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string>, activeSkinTone?: Maybe<string>, originalUnified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'WorkspaceFields', key: string, value: any, kind?: Maybe<EnumWorkspaceFieldsKind> }>>> }>> }> };

export type GetWorkspaceQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetWorkspaceQuery = { __typename?: 'Query', workspaceOne?: Maybe<{ __typename?: 'Workspace', _id: any, userId: any, slug?: Maybe<string>, isDeleted: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, title: string, description?: Maybe<string>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string>, activeSkinTone?: Maybe<string>, originalUnified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'WorkspaceFields', key: string, value: any, kind?: Maybe<EnumWorkspaceFieldsKind> }>>> }> };

export type NewWorkspaceMutationVariables = Exact<{
  record: CreateOneWorkspaceInput;
}>;


export type NewWorkspaceMutation = { __typename?: 'Mutation', workspaceCreateOne?: Maybe<{ __typename?: 'CreateOneWorkspacePayload', recordId?: Maybe<any>, record?: Maybe<{ __typename?: 'Workspace', _id: any, userId: any, slug?: Maybe<string>, isDeleted: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, title: string, description?: Maybe<string>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string>, activeSkinTone?: Maybe<string>, originalUnified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'WorkspaceFields', key: string, value: any, kind?: Maybe<EnumWorkspaceFieldsKind> }>>> }> }> };

export type UpdateWorkspaceMutationVariables = Exact<{
  filter: FilterUpdateOneWorkspaceInput;
  record: UpdateOneWorkspaceInput;
}>;


export type UpdateWorkspaceMutation = { __typename?: 'Mutation', workspaceUpdate?: Maybe<{ __typename?: 'UpdateOneWorkspacePayload', recordId?: Maybe<any>, record?: Maybe<{ __typename?: 'Workspace', _id: any, userId: any, slug?: Maybe<string>, isDeleted: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, title: string, description?: Maybe<string>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string>, activeSkinTone?: Maybe<string>, originalUnified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'WorkspaceFields', key: string, value: any, kind?: Maybe<EnumWorkspaceFieldsKind> }>>> }> }> };

export type WorkspaceDataFragment = { __typename?: 'Workspace', _id: any, userId: any, slug?: Maybe<string>, isDeleted: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, title: string, description?: Maybe<string>, emoji?: Maybe<{ __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string>, activeSkinTone?: Maybe<string>, originalUnified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'WorkspaceFields', key: string, value: any, kind?: Maybe<EnumWorkspaceFieldsKind> }>>> };

export type EmojiDataFragment = { __typename?: 'WorkspaceEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string>, activeSkinTone?: Maybe<string>, originalUnified?: Maybe<string> };

export const EmojiDataFragmentDoc = gql`
    fragment EmojiData on WorkspaceEmoji {
  emoji
  names
  unified
  activeSkinTone
  originalUnified
}
    `;
export const WorkspaceDataFragmentDoc = gql`
    fragment WorkspaceData on Workspace {
  _id
  userId
  slug
  isDeleted
  createdAt
  updatedAt
  title
  emoji {
    ...EmojiData
  }
  description
  fields {
    key
    value
    kind
  }
}
    ${EmojiDataFragmentDoc}`;
export const WorkspacesPaginationDocument = gql`
    query WorkspacesPagination($perPage: Int, $page: Int) {
  workspacePaginate(perPage: $perPage, page: $page) {
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
export const GetWorkspaceDocument = gql`
    query getWorkspace($slug: String!) {
  workspaceOne(filter: {slug: $slug}) {
    ...WorkspaceData
  }
}
    ${WorkspaceDataFragmentDoc}`;

export function useGetWorkspaceQuery(options: Omit<Urql.UseQueryArgs<GetWorkspaceQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetWorkspaceQuery>({ query: GetWorkspaceDocument, ...options });
};
export const NewWorkspaceDocument = gql`
    mutation NewWorkspace($record: CreateOneWorkspaceInput!) {
  workspaceCreateOne(record: $record) {
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
export const UpdateWorkspaceDocument = gql`
    mutation UpdateWorkspace($filter: FilterUpdateOneWorkspaceInput!, $record: UpdateOneWorkspaceInput!) {
  workspaceUpdate(record: $record, filter: $filter) {
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