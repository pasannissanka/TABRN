import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContextProvider';
import { ListView } from './ListView';

export const Views = () => {
  const params = useParams();
  const { workspaceData } = useContext(AppContext);

  console.log(params);
  return <div></div>;
};
