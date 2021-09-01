import { Document } from 'mongoose';
import { EntryType } from 'perf_hooks';
import { ViewType } from '../constants/viewTypes.enum';

export interface BaseView {
  userId: string;
  workspaceId: string;
  kind: ViewType;
  entryType: EntryType;
  title: string;
  description: string;
  slug?: string;
  isDeleted?: boolean;
}

export interface View extends BaseView, Document {}

export interface BaseViewReqData {
  title: string;
  description: string;
}
