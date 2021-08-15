import { model, Schema, Types } from 'mongoose';
import mongooseSlug from 'mongoose-slug-updater';
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
    type: {
      type: String,
      required: true,
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
    entryKind: {
      type: String,
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'kind',
  }
);

BaseView.plugin(mongooseSlug);

export const ViewModel = model<View>('View', BaseView);
