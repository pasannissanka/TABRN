import { model, Schema, Types } from 'mongoose';
import mongooseSlug from 'mongoose-slug-updater';
import { EntryType } from '../../workspace-entry/constants/entry.constants';
import { View } from '../types/view.type';

const BaseView = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    workspaceId: {
      type: Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    entryType: {
      type: String,
      enum: [EntryType.BOOKMARK, EntryType.NOTE],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      uniqueGroupSlug: ['userId', 'workspaceId'],
      slugPaddingSize: 4,
      slug: 'title',
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'kind',
  }
);

BaseView.plugin(mongooseSlug);

export const ViewModel = model<View>('View', BaseView);
