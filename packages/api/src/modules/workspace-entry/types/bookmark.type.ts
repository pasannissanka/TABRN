import { Document } from 'mongoose';
import { Tag } from '../../tags/types/tag.type';

export interface IBookmark {
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
}
