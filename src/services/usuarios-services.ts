import axios, { AxiosError } from 'axios';
import { User } from '../models/User';
import { back_end_url } from '../utils/constants';
import { manageError } from '../utils/services';

export const apiGetCurrentUser = async (): Promise<User> => {
  try {
    const res = await axios.get<User>(
      `${back_end_url}/api/auth/current-user`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const apiLoginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    console.log(`${back_end_url}/api/auth/login`)
    console.log(process.env.BACKEND_URL)
    const res = await axios.post<User>(`${back_end_url}/api/auth/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};
