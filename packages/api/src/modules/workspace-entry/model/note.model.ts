import { Schema } from 'mongoose';
import { EntryType } from '../constants/entry.constants';
import { EntryModel } from './entry.model';

const NoteSchema = new Schema({
  content: {
    type: String,
  },
});

export const NoteModel = EntryModel.discriminator(EntryType.NOTE, NoteSchema);
