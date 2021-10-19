import { Document } from 'mongoose';
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
  description: string;
  /// Dynamic fields
  fields: IField[];
}

export interface ICollection extends ICollectionBase, Document {}
