import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../models/User';
import { loginUserService } from '../services/usuarios-services';
import { CustomError } from '../utils/services';
import axios from 'axios';

const token = localStorage.getItem('token') || '';

const setDefaultAxiosToken = (givenToken: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${givenToken}`;
};
setDefaultAxiosToken(token);

interface UserState {
  email: string;
  token: string;
  cargando: boolean;
  mensajeError: string | null;
  authenticated: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  email: '',
  token,
  cargando: false,
  mensajeError: null,
  authenticated: false,
};

export const usersSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload }: PayloadAction<boolean>) => {
      state.cargando = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.cargando = false;
        state.email = payload.email;
        state.token = payload.token;
        state.authenticated = true;
      }
    );
    builder.addCase(
      loginUser.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
        state.authenticated = false;
      }
    );
  },
});

export const { setCargando } = usersSlice.actions;

export default usersSlice.reducer;

// Extra reducers
export interface LoginQuery {
  email: string;
  password: string;
}
export const loginUser = createAsyncThunk<
  User,
  LoginQuery,
  { rejectValue: CustomError }
>('user/loginUser', async ({ email, password }: LoginQuery, thunkApi) => {
  try {
    const userRes = await loginUserService(email, password);
    localStorage.setItem('token', userRes.token);
    setDefaultAxiosToken(userRes.token);
    return userRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});
