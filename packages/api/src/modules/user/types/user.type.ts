import { Document } from 'mongoose';

export interface IUser extends Document {
  provider: string;
  googleId: string;
  displayName: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  photos: any[];
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
