import { Document } from 'mongoose';
import { EntryType } from '../../workspace-entry/constants/entry.constants';
import { ViewType } from '../constants/viewTypes.enum';

export interface BaseView {
  userId: string;
  workspaceId: string;
  type: ViewType;
  title: string;
  description: string;
  entryKind?: EntryType;
  slug?: string;
  isDeleted?: boolean;
}

export interface View extends BaseView, Document {}

export interface ViewReqData {
  type: ViewType;
  title: string;
  description: string;
  entryKind?: EntryType;
}
