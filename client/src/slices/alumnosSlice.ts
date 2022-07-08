import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Alumno } from '../models/Alumno';
import {
  buscarAlumnoPorIdService,
  buscarAlumnosService,
  CustomError,
  eliminarAlumnosPorIdService,
} from '../services/alumnos-services';
import type { RootState } from '../store/store';

// Define a type for the slice state
interface AlumnosState {
  alumnos: Alumno[];
  alumnoSeleccionado: Alumno | null;
  cargando: boolean;
  cantidad: number;
  mensajeError: string | null;
}

// Define the initial state using that type
const initialState: AlumnosState = {
  alumnos: [],
  alumnoSeleccionado: null,
  cargando: false,
  cantidad: 0,
  mensajeError: null,
};

export const alumnosSlice = createSlice({
  name: 'alumno',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload }: PayloadAction<boolean>) => {
      state.cargando = payload;
    },
    limpiarAlumnos: (state) => {
      state.alumnos = initialState.alumnos;
      state.cantidad = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarAlumnos.pending, (state) => {
      state.cargando = true;
      state.cantidad = 0;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarAlumnos.fulfilled,
      (state, { payload }: PayloadAction<Alumno[] | null>) => {
        state.alumnos = payload || [];
        state.cargando = false;
        state.cantidad = state.alumnos.length;
      }
    );
    builder.addCase(
      buscarAlumnos.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(buscarAlumnoPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarAlumnoPorId.fulfilled,
      (state, { payload }: PayloadAction<Alumno | null>) => {
        state.alumnoSeleccionado = payload || null;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarAlumnoPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(eliminarAlumnoPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      eliminarAlumnoPorId.fulfilled,
      (state, { payload }: PayloadAction<Alumno | null>) => {
        state.alumnoSeleccionado = null;
        state.alumnos = state.alumnos.filter(
          (alumno) => alumno._id !== payload?._id
        );
        state.cargando = false;
      }
    );
    builder.addCase(
      eliminarAlumnoPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
  },
});

export const { setCargando, limpiarAlumnos } = alumnosSlice.actions;

export default alumnosSlice.reducer;

// Extra reducers

type AlumnoRes = Alumno[] | null;

export const buscarAlumnos = createAsyncThunk<
  AlumnoRes,
  void,
  { rejectValue: CustomError }
>('alumno/buscarAlumnos', async (_: void, thunkApi) => {
  try {
    const alumnosRes = await buscarAlumnosService();
    return alumnosRes || [];
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const buscarAlumnoPorId = createAsyncThunk<
  Alumno,
  string,
  { rejectValue: CustomError }
>('alumno/buscarAlumnoPorId', async (id: string, thunkApi) => {
  try {
    const alumnoRes = await buscarAlumnoPorIdService(id);
    return alumnoRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const eliminarAlumnoPorId = createAsyncThunk<
  Alumno,
  string,
  { rejectValue: CustomError }
>('alumno/eliminarAlumnosPorId', async (id: string, thunkApi) => {
  try {
    const alumnoRes = await eliminarAlumnosPorIdService(id);
    return alumnoRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});
