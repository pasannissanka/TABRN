import { Schema } from 'mongoose';
import { ViewType } from '../constants/viewTypes.enum';
import { ListView } from '../types/listView.type';
import { ViewModel } from './view.model';

const ListViewSchema = new Schema<ListView>({
  filterProperties: {
    type: [String],
  },
});

export const ListViewModel = ViewModel.discriminator<ListView>(
  ViewType.LIST_VIEW,
  ListViewSchema
);
