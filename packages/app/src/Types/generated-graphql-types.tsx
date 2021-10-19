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

export type Collection = {
  __typename?: 'Collection';
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  type?: Maybe<EnumCollectionType>;
  slug?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  title: Scalars['String'];
  emoji?: Maybe<CollectionEmoji>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<CollectionFields>>>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type CollectionEmoji = {
  __typename?: 'CollectionEmoji';
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type CollectionEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type CollectionFields = {
  __typename?: 'CollectionFields';
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumCollectionFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type CollectionFieldsInput = {
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumCollectionFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

/** List of items with pagination. */
export type CollectionPagination = {
  __typename?: 'CollectionPagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']>;
  /** Array of objects. */
  items?: Maybe<Array<Collection>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export type CreateOneCollectionInput = {
  workspaceId: Scalars['MongoID'];
  type?: Maybe<EnumCollectionType>;
  title: Scalars['String'];
  emoji?: Maybe<CollectionEmojiInput>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<CollectionFieldsInput>>>;
};

export type CreateOneCollectionPayload = {
  __typename?: 'CreateOneCollectionPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Collection>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneEntryInput = {
  workspaceId: Scalars['MongoID'];
  collectionId: Scalars['MongoID'];
  title: Scalars['String'];
  emoji?: Maybe<EntryEmojiInput>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<EntryFieldsInput>>>;
};

export type CreateOneEntryPayload = {
  __typename?: 'CreateOneEntryPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Entry>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneTagInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
};

export type CreateOneTagPayload = {
  __typename?: 'CreateOneTagPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Tag>;
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


export type Entry = {
  __typename?: 'Entry';
  userId: Scalars['MongoID'];
  workspaceId: Scalars['MongoID'];
  collectionId: Scalars['MongoID'];
  slug?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  title: Scalars['String'];
  emoji?: Maybe<EntryEmoji>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<EntryFields>>>;
  _id: Scalars['MongoID'];
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type EntryEmoji = {
  __typename?: 'EntryEmoji';
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type EntryEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type EntryFields = {
  __typename?: 'EntryFields';
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumEntryFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type EntryFieldsInput = {
  key: Scalars['String'];
  value: Scalars['JSON'];
  kind?: Maybe<EnumEntryFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

/** List of items with pagination. */
export type EntryPagination = {
  __typename?: 'EntryPagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']>;
  /** Array of objects. */
  items?: Maybe<Array<Entry>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export enum EnumCollectionFieldsKind {
  String = 'string',
  Date = 'date',
  Number = 'number',
  Link = 'link'
}

export enum EnumCollectionType {
  Calender = 'calender',
  Kanban = 'kanban',
  List = 'list'
}

export enum EnumEntryFieldsKind {
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

export type FilterCountCollectionEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type FilterCountCollectionFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumCollectionFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterCountCollectionInput = {
  userId?: Maybe<Scalars['MongoID']>;
  workspaceId?: Maybe<Scalars['MongoID']>;
  type?: Maybe<EnumCollectionType>;
  slug?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  emoji?: Maybe<FilterCountCollectionEmojiInput>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FilterCountCollectionFieldsInput>>>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterCountCollectionOperatorsInput>;
  OR?: Maybe<Array<FilterCountCollectionInput>>;
  AND?: Maybe<Array<FilterCountCollectionInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountCollectionOperatorsInput = {
  _id?: Maybe<FilterCountCollection_IdOperatorsInput>;
};

export type FilterCountCollection_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterCountEntryEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type FilterCountEntryFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumEntryFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterCountEntryInput = {
  userId?: Maybe<Scalars['MongoID']>;
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  slug?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  emoji?: Maybe<FilterCountEntryEmojiInput>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<FilterCountEntryFieldsInput>>>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterCountEntryOperatorsInput>;
  OR?: Maybe<Array<FilterCountEntryInput>>;
  AND?: Maybe<Array<FilterCountEntryInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountEntryOperatorsInput = {
  _id?: Maybe<FilterCountEntry_IdOperatorsInput>;
};

export type FilterCountEntry_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterCountTagInput = {
  userId?: Maybe<Scalars['MongoID']>;
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterCountTagOperatorsInput>;
  OR?: Maybe<Array<FilterCountTagInput>>;
  AND?: Maybe<Array<FilterCountTagInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountTagOperatorsInput = {
  _id?: Maybe<FilterCountTag_IdOperatorsInput>;
};

export type FilterCountTag_IdOperatorsInput = {
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

export type FilterFindManyCollectionFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumCollectionFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterFindManyCollectionInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  type?: Maybe<EnumCollectionType>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FilterFindManyCollectionFieldsInput>>>;
  OR?: Maybe<Array<FilterFindManyCollectionInput>>;
  AND?: Maybe<Array<FilterFindManyCollectionInput>>;
};

export type FilterFindManyEntryFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumEntryFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type FilterFindManyEntryInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<FilterFindManyEntryFieldsInput>>>;
  OR?: Maybe<Array<FilterFindManyEntryInput>>;
  AND?: Maybe<Array<FilterFindManyEntryInput>>;
};

export type FilterFindManyTagInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<FilterFindManyTagInput>>;
  AND?: Maybe<Array<FilterFindManyTagInput>>;
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
  collectionCreateOne?: Maybe<CreateOneCollectionPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  collectionUpdateById?: Maybe<UpdateByIdCollectionPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  EntryCreateOne?: Maybe<CreateOneEntryPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  EntryUpdateById?: Maybe<UpdateByIdEntryPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  TagCreateOne?: Maybe<CreateOneTagPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  TagUpdateById?: Maybe<UpdateByIdTagPayload>;
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
  record: CreateOneCollectionInput;
};


export type MutationCollectionUpdateByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdCollectionInput;
};


export type MutationEntryCreateOneArgs = {
  record: CreateOneEntryInput;
};


export type MutationEntryUpdateByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdEntryInput;
};


export type MutationTagCreateOneArgs = {
  record: CreateOneTagInput;
};


export type MutationTagUpdateByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdTagInput;
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
  collectionFind: Array<Collection>;
  collectionById?: Maybe<Collection>;
  collectionPaginate?: Maybe<CollectionPagination>;
  collectionCount?: Maybe<Scalars['Int']>;
  EntryFind: Array<Entry>;
  EntryById?: Maybe<Entry>;
  EntryPaginate?: Maybe<EntryPagination>;
  EntryCount?: Maybe<Scalars['Int']>;
  TagFind: Array<Tag>;
  TagById?: Maybe<Tag>;
  TagPaginate?: Maybe<TagPagination>;
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
  filter?: Maybe<FilterFindManyCollectionInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyCollectionInput>;
};


export type QueryCollectionByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryCollectionPaginateArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyCollectionInput>;
  sort?: Maybe<SortFindManyCollectionInput>;
};


export type QueryCollectionCountArgs = {
  filter?: Maybe<FilterCountCollectionInput>;
};


export type QueryEntryFindArgs = {
  filter?: Maybe<FilterFindManyEntryInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyEntryInput>;
};


export type QueryEntryByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryEntryPaginateArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyEntryInput>;
  sort?: Maybe<SortFindManyEntryInput>;
};


export type QueryEntryCountArgs = {
  filter?: Maybe<FilterCountEntryInput>;
};


export type QueryTagFindArgs = {
  filter?: Maybe<FilterFindManyTagInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyTagInput>;
};


export type QueryTagByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryTagPaginateArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyTagInput>;
  sort?: Maybe<SortFindManyTagInput>;
};


export type QueryTagCountArgs = {
  filter?: Maybe<FilterCountTagInput>;
};


export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export enum SortFindManyCollectionInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyEntryInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyTagInput {
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

export type Tag = {
  __typename?: 'Tag';
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
export type TagPagination = {
  __typename?: 'TagPagination';
  /** Total object count. */
  count?: Maybe<Scalars['Int']>;
  /** Array of objects. */
  items?: Maybe<Array<Tag>>;
  /** Information to aid in pagination. */
  pageInfo: PaginationInfo;
};

export type UpdateByIdCollectionEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type UpdateByIdCollectionFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumCollectionFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type UpdateByIdCollectionInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  type?: Maybe<EnumCollectionType>;
  title?: Maybe<Scalars['String']>;
  emoji?: Maybe<UpdateByIdCollectionEmojiInput>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<UpdateByIdCollectionFieldsInput>>>;
};

export type UpdateByIdCollectionPayload = {
  __typename?: 'UpdateByIdCollectionPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Collection>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateByIdEntryEmojiInput = {
  activeSkinTone?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
  originalUnified?: Maybe<Scalars['String']>;
  unified?: Maybe<Scalars['String']>;
};

export type UpdateByIdEntryFieldsInput = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  kind?: Maybe<EnumEntryFieldsKind>;
  _id?: Maybe<Scalars['MongoID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type UpdateByIdEntryInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
  emoji?: Maybe<UpdateByIdEntryEmojiInput>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<UpdateByIdEntryFieldsInput>>>;
};

export type UpdateByIdEntryPayload = {
  __typename?: 'UpdateByIdEntryPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Entry>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateByIdTagInput = {
  workspaceId?: Maybe<Scalars['MongoID']>;
  collectionId?: Maybe<Scalars['MongoID']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateByIdTagPayload = {
  __typename?: 'UpdateByIdTagPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Tag>;
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

export type NewCollectionMutationVariables = Exact<{
  record: CreateOneCollectionInput;
}>;


export type NewCollectionMutation = { __typename?: 'Mutation', collectionCreateOne?: Maybe<{ __typename?: 'CreateOneCollectionPayload', recordId?: Maybe<any>, record?: Maybe<{ __typename?: 'Collection', _id: any, userId: any, workspaceId: any, type?: Maybe<EnumCollectionType>, slug?: Maybe<string>, isDeleted: boolean, title: string, description?: Maybe<string>, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'CollectionEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'CollectionFields', key: string, value: any, kind?: Maybe<EnumCollectionFieldsKind> }>>> }>, error?: Maybe<{ __typename?: 'MongoError', message?: Maybe<string> } | { __typename?: 'RuntimeError', message?: Maybe<string> } | { __typename?: 'ValidationError', message?: Maybe<string> }> }> };

export type CollectionPaginateQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyCollectionInput>;
  sort?: Maybe<SortFindManyCollectionInput>;
}>;


export type CollectionPaginateQuery = { __typename?: 'Query', collectionPaginate?: Maybe<{ __typename?: 'CollectionPagination', count?: Maybe<number>, items?: Maybe<Array<{ __typename?: 'Collection', _id: any, userId: any, workspaceId: any, type?: Maybe<EnumCollectionType>, slug?: Maybe<string>, isDeleted: boolean, title: string, description?: Maybe<string>, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'CollectionEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'CollectionFields', key: string, value: any, kind?: Maybe<EnumCollectionFieldsKind> }>>> }>>, pageInfo: { __typename?: 'PaginationInfo', currentPage: number, perPage: number, pageCount?: Maybe<number>, itemCount?: Maybe<number>, hasNextPage?: Maybe<boolean>, hasPreviousPage?: Maybe<boolean> } }> };

export type CollectionDataFragment = { __typename?: 'Collection', _id: any, userId: any, workspaceId: any, type?: Maybe<EnumCollectionType>, slug?: Maybe<string>, isDeleted: boolean, title: string, description?: Maybe<string>, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'CollectionEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'CollectionFields', key: string, value: any, kind?: Maybe<EnumCollectionFieldsKind> }>>> };

export type CollectionEmojiDataFragment = { __typename?: 'CollectionEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> };

export type CollectionFieldsDataFragment = { __typename?: 'CollectionFields', key: string, value: any, kind?: Maybe<EnumCollectionFieldsKind> };

export type PaginationInfoDataFragment = { __typename?: 'PaginationInfo', currentPage: number, perPage: number, pageCount?: Maybe<number>, itemCount?: Maybe<number>, hasNextPage?: Maybe<boolean>, hasPreviousPage?: Maybe<boolean> };

export type NewEntryMutationVariables = Exact<{
  record: CreateOneEntryInput;
}>;


export type NewEntryMutation = { __typename?: 'Mutation', EntryCreateOne?: Maybe<{ __typename?: 'CreateOneEntryPayload', recordId?: Maybe<any>, record?: Maybe<{ __typename?: 'Entry', userId: any, workspaceId: any, collectionId: any, slug?: Maybe<string>, isDeleted: boolean, title: string, description?: Maybe<string>, tags?: Maybe<Array<Maybe<any>>>, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'EntryEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'EntryFields', key: string, value: any, kind?: Maybe<EnumEntryFieldsKind> }>>> }>, error?: Maybe<{ __typename?: 'MongoError', message?: Maybe<string> } | { __typename?: 'RuntimeError', message?: Maybe<string> } | { __typename?: 'ValidationError', message?: Maybe<string> }> }> };

export type EntryPaginateQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyEntryInput>;
  sort?: Maybe<SortFindManyEntryInput>;
}>;


export type EntryPaginateQuery = { __typename?: 'Query', EntryPaginate?: Maybe<{ __typename?: 'EntryPagination', count?: Maybe<number>, items?: Maybe<Array<{ __typename?: 'Entry', userId: any, workspaceId: any, collectionId: any, slug?: Maybe<string>, isDeleted: boolean, title: string, description?: Maybe<string>, tags?: Maybe<Array<Maybe<any>>>, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'EntryEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'EntryFields', key: string, value: any, kind?: Maybe<EnumEntryFieldsKind> }>>> }>>, pageInfo: { __typename?: 'PaginationInfo', currentPage: number, perPage: number, pageCount?: Maybe<number>, itemCount?: Maybe<number>, hasNextPage?: Maybe<boolean>, hasPreviousPage?: Maybe<boolean> } }> };

export type EntryDataFragment = { __typename?: 'Entry', userId: any, workspaceId: any, collectionId: any, slug?: Maybe<string>, isDeleted: boolean, title: string, description?: Maybe<string>, tags?: Maybe<Array<Maybe<any>>>, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any>, emoji?: Maybe<{ __typename?: 'EntryEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> }>, fields?: Maybe<Array<Maybe<{ __typename?: 'EntryFields', key: string, value: any, kind?: Maybe<EnumEntryFieldsKind> }>>> };

export type EntryEmojiDataFragment = { __typename?: 'EntryEmoji', emoji?: Maybe<string>, names?: Maybe<Array<Maybe<string>>>, unified?: Maybe<string> };

export type EntryFieldsDataFragment = { __typename?: 'EntryFields', key: string, value: any, kind?: Maybe<EnumEntryFieldsKind> };

export type NewTagMutationVariables = Exact<{
  record: CreateOneTagInput;
}>;


export type NewTagMutation = { __typename?: 'Mutation', TagCreateOne?: Maybe<{ __typename?: 'CreateOneTagPayload', recordId?: Maybe<any>, record?: Maybe<{ __typename?: 'Tag', userId: any, workspaceId?: Maybe<any>, collectionId?: Maybe<any>, slug?: Maybe<string>, title?: Maybe<string>, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any> }>, error?: Maybe<{ __typename?: 'MongoError', message?: Maybe<string> } | { __typename?: 'RuntimeError', message?: Maybe<string> } | { __typename?: 'ValidationError', message?: Maybe<string> }> }> };

export type TagPaginateQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterFindManyTagInput>;
  sort?: Maybe<SortFindManyTagInput>;
}>;


export type TagPaginateQuery = { __typename?: 'Query', TagPaginate?: Maybe<{ __typename?: 'TagPagination', count?: Maybe<number>, items?: Maybe<Array<{ __typename?: 'Tag', userId: any, workspaceId?: Maybe<any>, collectionId?: Maybe<any>, slug?: Maybe<string>, title?: Maybe<string>, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any> }>>, pageInfo: { __typename?: 'PaginationInfo', currentPage: number, perPage: number, pageCount?: Maybe<number>, itemCount?: Maybe<number>, hasNextPage?: Maybe<boolean>, hasPreviousPage?: Maybe<boolean> } }> };

export type TagDataFragment = { __typename?: 'Tag', userId: any, workspaceId?: Maybe<any>, collectionId?: Maybe<any>, slug?: Maybe<string>, title?: Maybe<string>, _id: any, updatedAt?: Maybe<any>, createdAt?: Maybe<any> };

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

export const CollectionEmojiDataFragmentDoc = gql`
    fragment CollectionEmojiData on CollectionEmoji {
  emoji
  names
  unified
}
    `;
export const CollectionFieldsDataFragmentDoc = gql`
    fragment CollectionFieldsData on CollectionFields {
  key
  value
  kind
}
    `;
export const CollectionDataFragmentDoc = gql`
    fragment CollectionData on Collection {
  _id
  userId
  workspaceId
  type
  slug
  isDeleted
  title
  emoji {
    ...CollectionEmojiData
  }
  description
  fields {
    ...CollectionFieldsData
  }
  updatedAt
  createdAt
}
    ${CollectionEmojiDataFragmentDoc}
${CollectionFieldsDataFragmentDoc}`;
export const PaginationInfoDataFragmentDoc = gql`
    fragment PaginationInfoData on PaginationInfo {
  currentPage
  perPage
  pageCount
  itemCount
  hasNextPage
  hasPreviousPage
}
    `;
export const EntryEmojiDataFragmentDoc = gql`
    fragment EntryEmojiData on EntryEmoji {
  emoji
  names
  unified
}
    `;
export const EntryFieldsDataFragmentDoc = gql`
    fragment EntryFieldsData on EntryFields {
  key
  value
  kind
}
    `;
export const EntryDataFragmentDoc = gql`
    fragment EntryData on Entry {
  userId
  workspaceId
  collectionId
  slug
  isDeleted
  title
  emoji {
    ...EntryEmojiData
  }
  description
  tags
  fields {
    ...EntryFieldsData
  }
  _id
  updatedAt
  createdAt
}
    ${EntryEmojiDataFragmentDoc}
${EntryFieldsDataFragmentDoc}`;
export const TagDataFragmentDoc = gql`
    fragment TagData on Tag {
  userId
  workspaceId
  collectionId
  slug
  title
  _id
  updatedAt
  createdAt
}
    `;
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
export const NewCollectionDocument = gql`
    mutation NewCollection($record: CreateOneCollectionInput!) {
  collectionCreateOne(record: $record) {
    recordId
    record {
      ...CollectionData
    }
    error {
      message
    }
  }
}
    ${CollectionDataFragmentDoc}`;

export function useNewCollectionMutation() {
  return Urql.useMutation<NewCollectionMutation, NewCollectionMutationVariables>(NewCollectionDocument);
};
export const CollectionPaginateDocument = gql`
    query CollectionPaginate($page: Int, $perPage: Int, $filter: FilterFindManyCollectionInput, $sort: SortFindManyCollectionInput) {
  collectionPaginate(perPage: $perPage, page: $page, filter: $filter) {
    count
    items {
      ...CollectionData
    }
    pageInfo {
      ...PaginationInfoData
    }
  }
}
    ${CollectionDataFragmentDoc}
${PaginationInfoDataFragmentDoc}`;

export function useCollectionPaginateQuery(options: Omit<Urql.UseQueryArgs<CollectionPaginateQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CollectionPaginateQuery>({ query: CollectionPaginateDocument, ...options });
};
export const NewEntryDocument = gql`
    mutation NewEntry($record: CreateOneEntryInput!) {
  EntryCreateOne(record: $record) {
    recordId
    record {
      ...EntryData
    }
    error {
      message
    }
  }
}
    ${EntryDataFragmentDoc}`;

export function useNewEntryMutation() {
  return Urql.useMutation<NewEntryMutation, NewEntryMutationVariables>(NewEntryDocument);
};
export const EntryPaginateDocument = gql`
    query EntryPaginate($page: Int, $perPage: Int, $filter: FilterFindManyEntryInput, $sort: SortFindManyEntryInput) {
  EntryPaginate(perPage: $perPage, page: $page, filter: $filter) {
    count
    items {
      ...EntryData
    }
    pageInfo {
      ...PaginationInfoData
    }
  }
}
    ${EntryDataFragmentDoc}
${PaginationInfoDataFragmentDoc}`;

export function useEntryPaginateQuery(options: Omit<Urql.UseQueryArgs<EntryPaginateQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EntryPaginateQuery>({ query: EntryPaginateDocument, ...options });
};
export const NewTagDocument = gql`
    mutation NewTag($record: CreateOneTagInput!) {
  TagCreateOne(record: $record) {
    recordId
    record {
      ...TagData
    }
    error {
      message
    }
  }
}
    ${TagDataFragmentDoc}`;

export function useNewTagMutation() {
  return Urql.useMutation<NewTagMutation, NewTagMutationVariables>(NewTagDocument);
};
export const TagPaginateDocument = gql`
    query TagPaginate($page: Int, $perPage: Int, $filter: FilterFindManyTagInput, $sort: SortFindManyTagInput) {
  TagPaginate(perPage: $perPage, page: $page, filter: $filter) {
    count
    items {
      ...TagData
    }
    pageInfo {
      ...PaginationInfoData
    }
  }
}
    ${TagDataFragmentDoc}
${PaginationInfoDataFragmentDoc}`;

export function useTagPaginateQuery(options: Omit<Urql.UseQueryArgs<TagPaginateQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TagPaginateQuery>({ query: TagPaginateDocument, ...options });
};
export const WorkspacesPaginationDocument = gql`
    query WorkspacesPagination($perPage: Int, $page: Int) {
  workspacePaginate(perPage: $perPage, page: $page) {
    count
    pageInfo {
      ...PaginationInfoData
    }
    items {
      ...WorkspaceData
    }
  }
}
    ${PaginationInfoDataFragmentDoc}
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