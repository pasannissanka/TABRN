import { model, Schema, Types } from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
import { IBookmark } from '../types/bookmark.type';

const BookmarkSchema = new Schema<IBookmark>({
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
  slug: {
    type: String,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  publication: new Schema(
    {
      faviconUrl: {
        type: String,
      },
      hostname: {
        type: String,
        required: true,
      },
    },
    { _id: false }
  ),
  imgUrl: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

BookmarkSchema.plugin(mongooseSlugPlugin, {
  tmpl: '<%=title%>',
});

export const BookmarkModel = model<IBookmark>('Bookmark', BookmarkSchema);
