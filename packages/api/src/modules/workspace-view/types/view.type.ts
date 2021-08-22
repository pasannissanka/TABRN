import { Document } from 'mongoose';
import { ViewType } from '../constants/viewTypes.enum';

export interface BaseView {
  userId: string;
  workspaceId: string;
  kind: ViewType;
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
