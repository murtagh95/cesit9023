import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import { Tarea } from '../models/Tarea'
import { buscarTaresService, CustomError } from '../services/tareas-services';
import type { RootState } from '../store/store'

// Define a type for the slice state
interface TareasState {
  tareas: Tarea[];
  cargando: boolean;
  cantidad: number;
  mensajeError: string | null;
}

// Define the initial state using that type
const initialState: TareasState = {
  tareas: [],
  cargando: false,
  cantidad: 0,
  mensajeError: null
}

export const tareasSlice = createSlice({
  name: 'tarea',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload } : PayloadAction<boolean>) => {
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
      builder.addCase(buscarTareas.fulfilled, (state, { payload } :PayloadAction<Tarea[] | null>) => {
        state.tareas = payload || [];
        state.cargando = false;
        state.cantidad = state.tareas.length;
      });
      builder.addCase(buscarTareas.rejected, (state, { payload }: PayloadAction<CustomError|undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      });
  }
})

export const { setCargando, limpiarTareas } = tareasSlice.actions

export default tareasSlice.reducer

// Extra reducers 

type TareaRes = Tarea[] | null;

export const buscarTareas = createAsyncThunk
                            <TareaRes, void, { rejectValue: CustomError}>(
    'tarea/buscarTareas',
    async (_: void, thunkApi) => {
        try {
            const tareasRes = await buscarTaresService();
            return tareasRes || [];
        } catch (error) {
            return thunkApi.rejectWithValue(error as CustomError)
        }
    }
)