import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Tarea } from '../models/Tarea'
import { buscarTaresService } from '../services/tareas-services';
import type { RootState } from '../store/store'

// Define a type for the slice state
interface TareasState {
  tareas: Tarea[];
  tareaSeleccionada: string | null;
  cargando: boolean;
  cantidad: number;
}

// Define the initial state using that type
const initialState: TareasState = {
  tareas: [],
  tareaSeleccionada: null,
  cargando: false,
  cantidad: 0
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
        state.tareaSeleccionada = initialState.tareaSeleccionada;
        state.cantidad = 0;
    }
  },
  extraReducers: (builder) => {
      builder.addCase(buscarTareas.pending, (state) => {
        state.cargando = true;
        state.cantidad = 0;
      });
      builder.addCase(buscarTareas.fulfilled, (state, action) => {
        state.tareas = action.payload || [];
        state.cargando = false;
        state.cantidad = state.tareas.length;
      });
      builder.addCase(buscarTareas.rejected, (state, action) => {
        console.info("---", action)
      });
  }
})

export const { setCargando, limpiarTareas } = tareasSlice.actions

export default tareasSlice.reducer

// Extra reducers 

export const buscarTareas = createAsyncThunk(
    'tarea/buscarTareas',
    async () => {
        const tareasRes = await buscarTaresService();
        return tareasRes;
    }
)