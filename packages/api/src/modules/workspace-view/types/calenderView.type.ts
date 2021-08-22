import { Document } from 'mongoose';
import { BaseView, BaseViewReqData } from './view.type';

export interface ICalenderView extends BaseView {
  dateFormat: string;
  timeFormat: string;
  primaryTZ: string;
  secondaryTZ?: string;
  weekStart: string;
}

export interface CalenderView extends ICalenderView, Document {}

export interface CalenderReqData extends BaseViewReqData {
  dateFormat: string;
  timeFormat: string;
  primaryTZ: string;
  secondaryTZ?: string;
  weekStart: string;
}
