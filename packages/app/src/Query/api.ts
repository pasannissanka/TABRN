import axios from 'axios';
import {
  IResponse,
  IUser,
  IWorkspace,
  WorkspaceBase,
  WorkspaceData,
} from '../Types/types';

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

export const updateWorkspace = async ({ _id, ...value }: WorkspaceData) => {
  const { data } = await axios.put<IResponse<IWorkspace>>(
    `http://localhost:4001/workspace/${_id}`,
    value,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const deleteWorkspace = async (id: string) => {
  const { data } = await axios.delete<IResponse<IWorkspace>>(
    `http://localhost:4001/workspace/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
