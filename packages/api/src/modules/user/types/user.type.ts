import { Document } from 'mongoose';

interface IToken {
  accessToken: string;
  refreshToken: string;
}
export interface IUser extends Document {
  provider: string;
  googleId: string;
  displayName: string;
  name: {
    firstName: string;
    lastName: string;
  };
  tokens: {
    google: IToken;
  };
  email: string;
  photos: any[];
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
