import { model, Schema, Types } from 'mongoose';
import { IWorkspace } from '../types/workspace.type';
import mongooseSlug from 'mongoose-slug-updater';
import { FIELD_TYPE } from '../../collection/constants/collection.constants';
// https://www.npmjs.com/package/mongoose-slug-updater

const WorkspaceSchema = new Schema<IWorkspace>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    slug: {
      type: String,
      uniqueGroupSlug: ['userId'],
      slugPaddingSize: 4,
      slug: 'title',
      index: true,
    },
    emoji: new Schema(
      {
        activeSkinTone: String,
        emoji: String,
        names: [String],
        originalUnified: String,
        unified: String,
      },
      { _id: false }
    ),
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    }, /// Dynamic fields
    fields: [
      new Schema(
        {
          key: {
            type: String,
            required: true,
          },
          value: {
            type: Schema.Types.Mixed,
            required: true,
          },
          kind: {
            type: String,
            enum: [
              FIELD_TYPE.STRING,
              FIELD_TYPE.DATE,
              FIELD_TYPE.NUMBER,
              FIELD_TYPE.LINK,
            ],
          },
        },
        {
          timestamps: true,
          id: false,
        }
      ),
    ],
  },
  { timestamps: true }
);

WorkspaceSchema.plugin(mongooseSlug);

export const WorkspaceModel = model<IWorkspace>('Workspace', WorkspaceSchema);
