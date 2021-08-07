import { Document } from 'mongoose';

export interface IWorkspace extends Document {
  userId: string;
  title: string;
  description: string;
  slug?: string;
  colorCode?: string;
  isDeleted: boolean;
}
