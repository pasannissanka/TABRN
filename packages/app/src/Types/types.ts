export interface AuthContextState {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  isLoading: boolean;
}

export interface IMongoDocument {
  _id: string;
}

export interface IResponse<T> {
  message: string;
  data: T;
}

export interface IUser extends IMongoDocument {
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

export interface IWorkspace extends IMongoDocument {
  userId: string;
  title: string;
  description: string;
  slug: string;
  colorCode?: string;
  isDeleted: boolean;
}
