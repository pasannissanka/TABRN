import { Document } from 'mongoose';
import { BaseEntry } from './entry.types';

export interface IBookmark extends BaseEntry {
  url: string;
  linkData: ILinkData;
}

export interface Bookmark extends Document, IBookmark {}

export interface ILinkData {
  title: string;
  faviconUrl: string;
  hostname: string;
}

export interface LinkData extends Document, ILinkData {}

export interface BookmarkReqBody {
  url: string;
  workspaceId: string;
  content: string;
  linkData: ILinkData;
}

export interface BookmarkUpdateBody {
  title: string;
  description: string;
  url: string;
  tags: string[];
  newWorkspaceId?: string;
}

export interface ParsedBookmarkContent {
  title: string;
  tags: string[];
  description: string;
  workspace_views: string[];
}
