export interface AuthContextState {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  isLoading: boolean;
}

export interface IResponse<T> {
  message: string;
  data: T;
}

export interface IUser {
  _id: string;
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
