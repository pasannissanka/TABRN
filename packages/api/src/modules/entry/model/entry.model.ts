import { model, Schema, Types } from 'mongoose';
import mongooseSlug from 'mongoose-slug-updater';
import { FIELD_TYPE } from '../../collection/constants/collection.constants';
import { IEntry } from '../types/entry.type';

const EntrySchema = new Schema(
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
    collectionId: {
      type: Types.ObjectId,
      ref: 'Collection',
      required: true,
    },
    slug: {
      type: String,
      uniqueGroupSlug: ['userId', 'workspaceId', 'collectionId'],
      slugPaddingSize: 4,
      slug: 'title',
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Fields
    /// Primary fields (Applicable to all collection types)
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: 'Tag',
      },
    ],
    /// Dynamic fields
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
  {
    timestamps: true,
  }
);

EntrySchema.plugin(mongooseSlug);

export const EntryModel = model<IEntry>('Entry', EntrySchema);
