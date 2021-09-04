import React from 'react';
import { Workspace, WorkspaceDataFragment } from './generated-graphql-types';

export interface AuthContextState {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  isLoading: boolean;
}

export interface AppContextState {
  workspaceData: WorkspaceState | undefined;
  setWorkspaceData: React.Dispatch<
    React.SetStateAction<WorkspaceState | undefined>
  >;
}

export interface BreadcrumbsContextState {
  navData: NavDataBC[];
  setNavData: React.Dispatch<React.SetStateAction<NavDataBC[]>>;
}

export interface NavDataBC {
  level: number;
  title: string;
  path: string;
  icon?: string;
  description: string;
}

export interface WorkspaceState {
  workspaceSlug: string;
  workspaceData?: WorkspaceDataFragment;
}

export interface IMongoDocument {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IResponse<T> {
  message: string;
  data: T;
}

export interface IPaginateData<T> {
  data: T;
  count: number;
  page: number;
  limit: number;
}

export interface IUser extends IMongoDocument {
  provider: string;
  googleId: string;
  displayName: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  photos: any[];
}

export interface WorkspaceBase {
  title: string;
  description: string;
  emoji?: any;
}

export interface WorkspaceData extends WorkspaceBase, IMongoDocument {}

export interface IWorkspace extends IMongoDocument, WorkspaceBase {
  userId: string;
  slug: string;
  isDeleted: boolean;
}

export interface TagBase {
  title: string;
  userId: string;
  slug?: string;
}

export interface Tag extends TagBase, IMongoDocument {}
export interface ILinkData {
  title: string;
  faviconUrl: string;
  hostname: string;
}
export interface BookmarkBase {
  userId: string;
  workspaceId: string;
  title: string;
  description: string;
  slug?: string;
  url: string;
  linkData: ILinkData;
  tags: string[] | Tag[];
  isDeleted?: boolean;
}

export interface Bookmark extends BookmarkBase, IMongoDocument {}
