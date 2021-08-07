import { Document } from 'mongoose';

export interface IBookmark extends Document {
  userId: string;
  workspaceId: string;
  title: string;
  slug: string;
  url: string;
  publication: IPublication;
  imgUrl: string;
  tags: string[];
  isDeleted: boolean;
}

interface IPublication {
  faviconUrl: string;
  hostname: string;
}
