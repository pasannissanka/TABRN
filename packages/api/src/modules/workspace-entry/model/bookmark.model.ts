import { model, Schema, Types } from 'mongoose';
import mongooseSlug from 'mongoose-slug-updater';
import { Bookmark, ILinkData } from '../types/bookmark.type';

const BookmarkSchema = new Schema<Bookmark>(
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
    url: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: 'Tag',
      },
    ],
    linkData: new Schema<ILinkData>({
      title: {
        type: String,
      },
      hostname: {
        type: String,
      },
      faviconUrl: {
        type: String,
      },
    }),
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

BookmarkSchema.plugin(mongooseSlug);

export const BookmarkModel = model<Bookmark>('Bookmark', BookmarkSchema);
