import axios from 'axios';
import { User } from '../models/User';
import { manageError } from '../utils/services';

export const loginUserService = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const res = await axios.post<User>(`http://localhost:5005/api/auth/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};
