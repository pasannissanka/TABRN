import React from 'react';
import { BreadcrumbsContextState } from '../Types/types';

export const BreadcrumbsContext = React.createContext<BreadcrumbsContextState>({
  navData: [],
  setNavData: () => {},
});

export const useBreadcrumbsContext = () => React.useContext(BreadcrumbsContext);
