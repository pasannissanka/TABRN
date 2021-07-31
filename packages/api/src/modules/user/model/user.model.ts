import { model, Schema } from 'mongoose';
import { IUser } from '../types/user.type';

const userSchema = new Schema<IUser>({
  provider: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  displayName: {
    type: String,
    required: true,
  },
  name: new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
    },
    { _id: false }
  ),
  email: {
    type: String,
    required: true,
  },
  photos: {
    type: [
      new Schema(
        {
          value: {
            type: String,
          },
        },
        { _id: false }
      ),
    ],
  },
});

export const UserModel = model<IUser>('User', userSchema);
