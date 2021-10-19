import { Document } from 'mongoose';
import { IField } from '../../collection/types/collection.types';

export interface IEntryBase {
  userId: string;
  workspaceId: string;
  collectionId: string;
  slug: string;
  isDeleted: boolean;
  // Fields
  /// Primary
  title: string;
  description: string;
  /// Dynamic fields
  fields: IField[];
}

export interface IEntry extends IEntryBase, Document {}
