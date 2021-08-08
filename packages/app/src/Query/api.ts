import axios from 'axios';
import { IResponse, IUser, IWorkspace, WorkspaceBase } from '../Types/types';

export const getUser = async () => {
  const { data } = await axios.get<IResponse<IUser>>(
    `http://localhost:4001/user`,
    { withCredentials: true }
  );
  return data.data;
};

export const getWorkspacesList = async () => {
  const { data } = await axios.get<IResponse<IWorkspace[]>>(
    'http://localhost:4001/workspace/all',
    { withCredentials: true }
  );
  return data.data;
};

export const createNewWorkspace = async (value: WorkspaceBase) => {
  const { data } = await axios.post<IResponse<IWorkspace>>(
    'http://localhost:4001/workspace/create',
    value,
    {
      withCredentials: true,
    }
  );
  return data;
};
