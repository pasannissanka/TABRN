export interface AuthContextState {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  isLoading: boolean;
}

export interface IMongoDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface WorkspaceBase {
  title: string;
  description: string;
  colorCode?: string;
}

export interface IWorkspace extends IMongoDocument, WorkspaceBase {
  userId: string;
  slug: string;
  isDeleted: boolean;
}
