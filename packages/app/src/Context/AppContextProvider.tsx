import React from 'react';
import { AppContextState } from '../Types/types';

export const AppContext = React.createContext<AppContextState>({
  workspaceData: {
    workspaceSlug: '',
    workspaceData: undefined,
  },
  setWorkspaceData: () => {},
});

export const useAppContext = () => React.useContext(AppContext);
