import { Document } from 'mongoose';
import { BaseView, BaseViewReqData } from './view.type';

export interface IListView extends BaseView {
  filterProperties: any[];
}

export interface ListView extends IListView, Document {}

export interface ListViewReqData extends BaseViewReqData {
  filterProperties?: any[];
}
