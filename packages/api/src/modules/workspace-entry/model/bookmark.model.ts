import { Schema } from 'mongoose';
import { EntryType } from '../constants/entry.constants';
import { Bookmark, ILinkData } from '../types/bookmark.type';
import { EntryModel } from './entry.model';

const BookmarkSchema = new Schema<Bookmark>({
  url: {
    type: String,
    required: true,
  },
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
});

export const BookmarkModel = EntryModel.discriminator<Bookmark>(
  EntryType.BOOKMARK,
  BookmarkSchema
);
