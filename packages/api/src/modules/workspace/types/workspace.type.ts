import { Document } from 'mongoose';
import { IField } from '../../collection/types/collection.types';

export interface IWorkspace extends Document {
  userId: string;
  slug?: string;
  icon?: string;
  isDeleted: boolean;
  // Fields
  /// Primary
  title: string;
  description: string;
  /// Dynamic fields
  fields: IField[];
}

export interface IEmojiData {
  activeSkinTone: string;
  emoji: string;
  names: string[];
  originalUnified: string;
  unified: string;
}
