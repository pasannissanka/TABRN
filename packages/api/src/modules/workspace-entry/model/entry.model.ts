import { model, Schema, Types } from 'mongoose';
import mongooseSlug from 'mongoose-slug-updater';
import { Entry } from '../types/entry.types';

const BaseEntrySchema = new Schema<Entry>(
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
    viewId: {
      type: Types.ObjectId,
      ref: 'View',
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
    tags: [
      {
        type: Types.ObjectId,
        ref: 'Tag',
      },
    ],
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

BaseEntrySchema.plugin(mongooseSlug);

export const EntryModel = model<Entry>('Entry', BaseEntrySchema);
