import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { Curso } from "../models/Curso";
import { buscarCursosService,CustomError } from "../services/cursos-services";

interface CursosState {
    cursos: Curso[];
    cargando: boolean;
    cantidadCursos: number;
    mensajeError: string | null;
}

const initialState: CursosState = {
    cursos: [],
    cargando: false,
    cantidadCursos: 0,
    mensajeError: null
}

export const cursosSlice = createSlice({
    name: 'curso',
    initialState,
    reducers: {
        setCargando: (state, { payload } : PayloadAction<boolean>) => {
            state.cargando = payload;
        },
        limpiarCurso: (state) => {
            state.cursos = initialState.cursos;
            state.cantidadCursos = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(buscarCurso.pending, (state) => {
              state.cargando = true;
              state.cantidadCursos = 0;
              state.mensajeError = null;
        });
        builder.addCase(buscarCurso.fulfilled, (state, { payload } :PayloadAction<Curso[] | null>) => {
              state.cursos = payload || [];
              state.cargando = false;
              state.cantidadCursos = state.cursos.length;
        });
        builder.addCase(buscarCurso.rejected, (state, { payload }: PayloadAction<CustomError|undefined>) => {
              state.mensajeError = payload?.message || 'Error desconocido';
              state.cargando = false;
        });
    }
});
export const { setCargando, limpiarCurso } = cursosSlice.actions

export default cursosSlice.reducer

type CursoRes = Curso[] | null;

export const buscarCurso = createAsyncThunk
                            <CursoRes, void, { rejectValue: CustomError}>(
    'tarea/buscarCurso',
    async (_: void, thunkApi) => {
        try {
            const tareasRes = await buscarCursosService();
            return tareasRes || [];
        } catch (error) {
            return thunkApi.rejectWithValue(error as CustomError)
        }
    }
)