import { Schema } from 'mongoose';
import { ViewType } from '../constants/viewTypes.enum';
import { CalenderView } from '../types/calenderView.type';
import { ViewModel } from './view.model';

const CalenderViewSchema = new Schema<CalenderView>({
  dateFormat: { type: String },
  timeFormat: { type: String },
  primaryTZ: { type: String },
  secondaryTZ: { type: String },
  weekStart: { type: String },
});

export const CalenderViewModel = ViewModel.discriminator<CalenderView>(
  ViewType.CALENDER,
  CalenderViewSchema
);
