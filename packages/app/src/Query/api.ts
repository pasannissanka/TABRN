import axios from 'axios';
import { IResponse, IUser } from '../Types/types';

export const getUser = async () => {
  const { data } = await axios.get<IResponse<IUser>>(
    `http://localhost:4001/user`,
    { withCredentials: true }
  );
  return data.data;
};
