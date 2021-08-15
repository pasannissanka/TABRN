import { Document } from 'mongoose';
import { EntryType } from '../../workspace-entry/constants/entry.constants';
import { ViewType } from '../constants/viewTypes.enum';

export interface BaseView {
  userId: string;
  workspaceId: string;
  type: ViewType;
  title: string;
  description: string;
  slug?: string;
  isDeleted?: boolean;
  entryKind?: EntryType;
}

export interface View extends BaseView, Document {}
