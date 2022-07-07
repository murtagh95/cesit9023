import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { Carrera } from '../models/Carrera';
import {
  buscarCarreraPorIdService,
  buscarCarrerasService,
  CustomError,
  eliminarCarreraPorIdService,
} from '../services/carreras-services';

// Define a type for the slice state
interface CarrerasState {
  carreras: Carrera[];
  carreraSeleccionada: Carrera | null;
  cargando: boolean;
  cantidadCarrera: number;
  mensajeError: string | null;
}

// Define the initial state using that type
const initialState: CarrerasState = {
  carreras: [],
  carreraSeleccionada: null,
  cargando: false,
  cantidadCarrera: 0,
  mensajeError: null
}

export const carrerasSlice = createSlice({
  name: 'carrera',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload }: PayloadAction<boolean>) => {
      state.cargando = payload;
    },
    limpiarCarrera: (state) => {
      state.carreras = initialState.carreras;
      state.cantidadCarrera = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarCarrera.pending, (state) => {
      state.cargando = true;
      state.cantidadCarrera = 0;
      state.mensajeError = null;
    });
    builder.addCase(buscarCarrera.fulfilled, (state, { payload }: PayloadAction<Carrera[] | null>) => {
      state.carreras = payload || [];
      state.cargando = false;
      state.cantidadCarrera = state.carreras.length;
    });
    builder.addCase(buscarCarrera.rejected, (state, { payload }: PayloadAction<CustomError | undefined>) => {
      state.mensajeError = payload?.message || 'Error desconocido';
      state.cargando = false;
    });

    builder.addCase(buscarCarreraPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarCarreraPorId.fulfilled,
      (state, { payload }: PayloadAction<Carrera | null>) => {
        state.carreraSeleccionada = payload || null;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarCarreraPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(eliminarCarreraPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      eliminarCarreraPorId.fulfilled,
      (state, { payload }: PayloadAction<Carrera | null>) => {
        state.carreraSeleccionada = null;
        state.carreras = state.carreras.filter(
          (carrera) => carrera._id !== payload?._id
        );
        state.cargando = false;
      }
    );
    builder.addCase(
      eliminarCarreraPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
  }
})

export const { setCargando, limpiarCarrera } = carrerasSlice.actions

export default carrerasSlice.reducer

// Extra reducers 

type CarreraRes = Carrera[] | null;

export const buscarCarrera = createAsyncThunk
  <CarreraRes, void, { rejectValue: CustomError }>(
    'tarea/buscarCarrera',
    async (_: void, thunkApi) => {
      try {
        const tareasRes = await buscarCarrerasService();
        return tareasRes || [];
      } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError)
      }
    }
  )

export const buscarCarreraPorId = createAsyncThunk<
  Carrera,
  string,
  { rejectValue: CustomError }
>('carrera/buscarCarreraPorId', async (id: string, thunkApi) => {
  try {
    const carreraRes = await buscarCarreraPorIdService(id);
    return carreraRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const eliminarCarreraPorId = createAsyncThunk<
  Carrera,
  string,
  { rejectValue: CustomError }
>('carrera/eliminarCarreraPorId', async (id: string, thunkApi) => {
  try {
    const carreraRes = await eliminarCarreraPorIdService(id);
    return carreraRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

