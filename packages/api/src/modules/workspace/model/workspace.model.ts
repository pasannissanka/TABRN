import { model, Schema, Types } from 'mongoose';
import { IWorkspace } from '../types/workspace.type';
import mongooseSlug from 'mongoose-slug-updater';
// https://www.npmjs.com/package/mongoose-slug-updater

const WorkspaceSchema = new Schema<IWorkspace>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
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
      uniqueGroupSlug: ['userId'],
      slugPaddingSize: 4,
      slug: 'title',
      index: true,
    },
    colorCode: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

WorkspaceSchema.plugin(mongooseSlug);

export const WorkspaceModel = model<IWorkspace>('Workspace', WorkspaceSchema);
