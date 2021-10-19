import { Document } from 'mongoose';
import { IField } from '../../collection/types/collection.types';
import { IEmojiData } from '../../workspace/types/workspace.type';

export interface IEntryBase {
  userId: string;
  workspaceId: string;
  collectionId: string;
  slug: string;
  isDeleted: boolean;
  // Fields
  /// Primary
  title: string;
  description: string;
  emoji?: IEmojiData;
  /// Dynamic fields
  fields: IField[];
}

export interface IEntry extends IEntryBase, Document {}

/// Extension Types
export interface ILinkData {
  title: string;
  faviconUrl: string;
  hostname: string;
}

export interface ExtensionReqBody {
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
