import { Document } from 'mongoose';
import { IEmojiData } from '../../workspace/types/workspace.type';
import { COLLECTION_TYPE, FIELD_TYPE } from '../constants/collection.constants';

export interface IField extends Document {
  key: string;
  value: any;
  kind: FIELD_TYPE;
}

export interface ICollectionBase {
  userId: string;
  workspaceId: string;
  type: COLLECTION_TYPE;
  slug: string;
  isDeleted: boolean;
  // Fields
  /// Primary
  title: string;
  emoji?: IEmojiData;
  description: string;
  /// Dynamic fields
  fields: IField[];
}

export interface ICollection extends ICollectionBase, Document {}
