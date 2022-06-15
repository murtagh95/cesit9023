import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { Carrera } from '../models/Carrera';
import { buscarCarrerasService,CustomError } from '../services/carreras-services';

// Define a type for the slice state
interface CarrerasState {
  carreras: Carrera[];
  cargando: boolean;
  cantidad: number;
  mensajeError: string | null;
}

// Define the initial state using that type
const initialState: CarrerasState = {
  carreras: [],
  cargando: false,
  cantidad: 0,
  mensajeError: null
}

export const carrerasSlice = createSlice({
  name: 'carrera',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload } : PayloadAction<boolean>) => {
        state.cargando = payload;
    },
    limpiarCarrera: (state) => {
        state.carreras = initialState.carreras;
        state.cantidad = 0;
    },
  },
  extraReducers: (builder) => {
      builder.addCase(buscarCarrera.pending, (state) => {
        state.cargando = true;
        state.cantidad = 0;
        state.mensajeError = null;
      });
      builder.addCase(buscarCarrera.fulfilled, (state, { payload } :PayloadAction<Carrera[] | null>) => {
        state.carreras = payload || [];
        state.cargando = false;
        state.cantidad = state.carreras.length;
      });
      builder.addCase(buscarCarrera.rejected, (state, { payload }: PayloadAction<CustomError|undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      });
  }
})

export const { setCargando, limpiarCarrera } = carrerasSlice.actions

export default carrerasSlice.reducer

// Extra reducers 

type CarreraRes = Carrera[] | null;

export const buscarCarrera = createAsyncThunk
                            <CarreraRes, void, { rejectValue: CustomError}>(
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