import { Document } from 'mongoose';

export interface ITag {
  title: string;
  userId: string;
  slug?: string;
}

export interface Tag extends Document, ITag {}
