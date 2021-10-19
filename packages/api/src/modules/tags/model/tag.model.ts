import { model, Schema, Types } from 'mongoose';
import mongooseSlug from 'mongoose-slug-updater';
import { Tag } from '../types/tag.type';

const TagSchema = new Schema<Tag>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    workspaceId: {
      type: Types.ObjectId,
      ref: 'Workspace',
    },
    collectionId: {
      type: Types.ObjectId,
      ref: 'Collection',
    },
    title: {
      type: String,
    },
    slug: {
      type: String,
      uniqueGroupSlug: ['userId'],
      slugPaddingSize: 4,
      slug: 'title',
    },
  },
  {
    timestamps: true,
  }
);

TagSchema.plugin(mongooseSlug);

export const TagModel = model<Tag>('Tag', TagSchema);
