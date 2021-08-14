import { Document } from 'mongoose';

export interface IWorkspace extends Document {
  userId: string;
  title: string;
  description: string;
  slug?: string;
  emoji?: IEmojiData;
  isDeleted: boolean;
}

export interface IEmojiData {
  activeSkinTone: string;
  emoji: string;
  names: string[];
  originalUnified: string;
  unified: string;
}
