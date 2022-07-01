import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import { Rol } from '../models/Rol'
import {
  buscarRolPorIdService,
  buscarRolService,
  CustomError,
  eliminarRolPorIdService
} from '../services/roles-services';
import type { RootState } from '../store/store'

// Define a type for the slice state
interface RolesState {
  roles: Rol[];
  rolSeleccionado: Rol | null;
  cargando: boolean;
  cantidad: number;
  mensajeError: string | null;
}

// Define the initial state using that type
const initialState: RolesState = {
  roles: [],
  rolSeleccionado: null,
  cargando: false,
  cantidad: 0,
  mensajeError: null
}

export const rolesSlice = createSlice({
  name: 'rol',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload }: PayloadAction<boolean>) => {
      state.cargando = payload;
    },
    limpiarRoles: (state) => {
      state.roles = initialState.roles;
      state.cantidad = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarRoles.pending, (state) => {
      state.cargando = true;
      state.cantidad = 0;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarRoles.fulfilled,
      (state, { payload }: PayloadAction<Rol[] | null>) => {
        state.roles = payload || [];
        state.cargando = false;
        state.cantidad = state.roles.length;
      }
    );
    builder.addCase(
      buscarRoles.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(buscarRolPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarRolPorId.fulfilled,
      (state, { payload }: PayloadAction<Rol | null>) => {
        state.rolSeleccionado = payload || null;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarRolPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(eliminarRolPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      eliminarRolPorId.fulfilled,
      (state, { payload }: PayloadAction<Rol | null>) => {
        state.rolSeleccionado = null;
        state.roles = state.roles.filter(
          (rol) => rol._id !== payload?._id
        );
        state.cargando = false;
      }
    );
    builder.addCase(
      eliminarRolPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
  },
});

export const { setCargando, limpiarRoles } = rolesSlice.actions

export default rolesSlice.reducer

// Extra reducers

type RolRes = Rol[] | null;

export const buscarRoles = createAsyncThunk<
  RolRes,
  void,
  { rejectValue: CustomError }
>('rol/buscarRoles', async (_: void, thunkApi) => {
  try {
    const rolesRes = await buscarRolService();
    return rolesRes || [];
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const buscarRolPorId = createAsyncThunk<
  Rol,
  string,
  { rejectValue: CustomError }
>('rol/buscarRolPorId', async (id: string, thunkApi) => {
  try {
    const rolRes = await buscarRolPorIdService(id);
    return rolRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const eliminarRolPorId = createAsyncThunk<
  Rol,
  string,
  { rejectValue: CustomError }
>('rol/eliminarRolPorId', async (id: string, thunkApi) => {
  try {
    const rolRes = await eliminarRolPorIdService(id);
    return rolRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});