import { model, Schema, Types } from 'mongoose';
import mongooseSlug from 'mongoose-slug-updater';
import { COLLECTION_TYPE, FIELD_TYPE } from '../constants/collection.constants';
import { ICollection } from '../types/collection.types';

const CollectionSchema = new Schema(
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
      enum: [
        COLLECTION_TYPE.CALENDER,
        COLLECTION_TYPE.KANBAN,
        COLLECTION_TYPE.LIST,
      ],
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
    // Fields
    /// Primary fields (Applicable to all collection types)
    title: {
      type: String,
      required: true,
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
    description: {
      type: String,
    },
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

CollectionSchema.plugin(mongooseSlug);

export const CollectionModel = model<ICollection>(
  'Collection',
  CollectionSchema
);
