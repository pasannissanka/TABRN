import { Document } from 'mongoose';
import { Tag } from '../../tags/types/tag.type';
import { EntryType } from '../constants/entry.constants';

export interface BaseEntry {
  userId: string;
  workspaceId: string;
  viewId: string;
  title: string;
  description: string;
  slug?: string;
  tags: string[] | Tag[];
  isDeleted?: boolean;
  kind?: EntryType;
}

export interface Entry extends BaseEntry, Document {}
