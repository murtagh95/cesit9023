import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Tarea } from '../models/Tarea';
import {
  buscarTareaPorIdService,
  buscarTaresService,
  CustomError,
  eliminarTareaPorIdService,
} from '../services/tareas-services';
import type { RootState } from '../store/store';

// Define a type for the slice state
interface TareasState {
  tareas: Tarea[];
  tareaSeleccionada: Tarea | null;
  cargando: boolean;
  cantidad: number;
  mensajeError: string | null;
}

// Define the initial state using that type
const initialState: TareasState = {
  tareas: [],
  tareaSeleccionada: null,
  cargando: false,
  cantidad: 0,
  mensajeError: null,
};

export const tareasSlice = createSlice({
  name: 'tarea',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload }: PayloadAction<boolean>) => {
      state.cargando = payload;
    },
    limpiarTareas: (state) => {
      state.tareas = initialState.tareas;
      state.cantidad = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarTareas.pending, (state) => {
      state.cargando = true;
      state.cantidad = 0;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarTareas.fulfilled,
      (state, { payload }: PayloadAction<Tarea[] | null>) => {
        state.tareas = payload || [];
        state.cargando = false;
        state.cantidad = state.tareas.length;
      }
    );
    builder.addCase(
      buscarTareas.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(buscarTareaPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarTareaPorId.fulfilled,
      (state, { payload }: PayloadAction<Tarea | null>) => {
        state.tareaSeleccionada = payload || null;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarTareaPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(eliminarTareaPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      eliminarTareaPorId.fulfilled,
      (state, { payload }: PayloadAction<Tarea | null>) => {
        state.tareaSeleccionada = null;
        state.tareas = state.tareas.filter(
          (tarea) => tarea._id !== payload?._id
        );
        state.cargando = false;
      }
    );
    builder.addCase(
      eliminarTareaPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
  },
});

export const { setCargando, limpiarTareas } = tareasSlice.actions;

export default tareasSlice.reducer;

// Extra reducers
interface BuscarTareasQuery {
  criterio?: string;
}
type TareaRes = Tarea[] | null;

export const buscarTareas = createAsyncThunk<
  TareaRes,
  BuscarTareasQuery | undefined,
  { rejectValue: CustomError }
>(
  'tarea/buscarTareas',
  async (props: BuscarTareasQuery | undefined, thunkApi) => {
    try {
      const tareasRes = await buscarTaresService(props?.criterio);
      return tareasRes || [];
    } catch (error) {
      return thunkApi.rejectWithValue(error as CustomError);
    }
  }
);

export const buscarTareaPorId = createAsyncThunk<
  Tarea,
  string,
  { rejectValue: CustomError }
>('tarea/buscarTareaPorId', async (id: string, thunkApi) => {
  try {
    const tareaRes = await buscarTareaPorIdService(id);
    return tareaRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const eliminarTareaPorId = createAsyncThunk<
  Tarea,
  string,
  { rejectValue: CustomError }
>('tarea/eliminarTareaPorId', async (id: string, thunkApi) => {
  try {
    const tareaRes = await eliminarTareaPorIdService(id);
    return tareaRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});
