import React from 'react';
import { AuthContextState } from '../Types/types';

export const AuthContext = React.createContext<AuthContextState>({
  user: undefined,
  isLoading: false,
});

export const useAuthContext = () => React.useContext(AuthContext);
