import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import { Profesor } from '../models/Profesor'
import { buscarProfesorService, CustomError } from '../services/profesores-services';
import type { RootState } from '../store/store'

// Define a type for the slice state
interface ProfesoresState {
  profesores: Profesor[];
  cargando: boolean;
  cantidad: number;
  mensajeError: string | null;
}

// Define the initial state using that type
const initialState: ProfesoresState = {
  profesores: [],
  cargando: false,
  cantidad: 0,
  mensajeError: null
}

export const profesoresSlice = createSlice({
  name: 'profesor',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload } : PayloadAction<boolean>) => {
        state.cargando = payload;
    },
    limpiarProfesores: (state) => {
        state.profesores = initialState.profesores;
        state.cantidad = 0;
    },
  },
  extraReducers: (builder) => {
      builder.addCase(buscarProfesores.pending, (state) => {
        state.cargando = true;
        state.cantidad = 0;
        state.mensajeError = null;
      });
      builder.addCase(buscarProfesores.fulfilled, (state, { payload } :PayloadAction<Profesor[] | null>) => {
        state.profesores = payload || [];
        state.cargando = false;
        state.cantidad = state.profesores.length;
      });
      builder.addCase(buscarProfesores.rejected, (state, { payload }: PayloadAction<CustomError|undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      });
  }
})

export const { setCargando, limpiarProfesores } = profesoresSlice.actions

export default profesoresSlice.reducer

// Extra reducers 

type ProfesorRes = Profesor[] | null;

export const buscarProfesores = createAsyncThunk
                            <ProfesorRes, void, { rejectValue: CustomError}>(
    'profesor/buscarProfesores',
    async (_: void, thunkApi) => {
        try {
            const profesoresRes = await buscarProfesorService();
            return profesoresRes || [];
        } catch (error) {
            return thunkApi.rejectWithValue(error as CustomError)
        }
    }
)