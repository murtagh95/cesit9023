import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { Curso } from "../models/Curso";
import { buscarCursosService, buscarCursoPorIdService, CustomError, eliminarCursoPorIdService } from "../services/cursos-services";

interface CursosState {
    cursos: Curso[];
    cargando: boolean;
    cursoSeleccionado: Curso | null;
    cantidadCursos: number;
    mensajeError: string | null;
}

const initialState: CursosState = {
    cursos: [],
    cargando: false,
    cursoSeleccionado: null,
    cantidadCursos: 0,
    mensajeError: null
}

export const cursosSlice = createSlice({
    name: 'curso',
    initialState,
    reducers: {
        setCargando: (state, { payload }: PayloadAction<boolean>) => {
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
        builder.addCase(buscarCurso.fulfilled, (state, { payload }: PayloadAction<Curso[] | null>) => {
            state.cursos = payload || [];
            state.cargando = false;
            state.cantidadCursos = state.cursos.length;
        });
        builder.addCase(buscarCurso.rejected, (state, { payload }: PayloadAction<CustomError | undefined>) => {
            state.mensajeError = payload?.message || 'Error desconocido';
            state.cargando = false;
        });

        builder.addCase(buscarCursoPorId.pending, (state) => {
            state.cargando = true;
            state.mensajeError = null;
        });
        builder.addCase(
            buscarCursoPorId.fulfilled,
            (state, { payload }: PayloadAction<Curso | null>) => {
                state.cursoSeleccionado = payload || null;
                state.cargando = false;
            }
        );
        builder.addCase(
            buscarCursoPorId.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );
        builder.addCase(eliminarCursoPorId.pending, (state) => {
            state.cargando = true;
            state.mensajeError = null;
        });
        builder.addCase(
            eliminarCursoPorId.fulfilled,
            (state, { payload }: PayloadAction<Curso | null>) => {
                state.cursoSeleccionado = null;
                state.cursos = state.cursos.filter(
                    (curso) => curso._id !== payload?._id
                );
                state.cargando = false;
            }
        );
        builder.addCase(
            eliminarCursoPorId.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );
    }
});
export const { setCargando, limpiarCurso } = cursosSlice.actions

export default cursosSlice.reducer

type CursoRes = Curso[] | null;

export const buscarCurso = createAsyncThunk
    <CursoRes, void, { rejectValue: CustomError }>(
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

export const buscarCursoPorId = createAsyncThunk<
    Curso,
    string,
    { rejectValue: CustomError }
>('carrera/buscarCursoPorId', async (id: string, thunkApi) => {
    try {
        const cursoRes = await buscarCursoPorIdService(id);
        return cursoRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});

export const eliminarCursoPorId = createAsyncThunk<
    Curso,
    string,
    { rejectValue: CustomError }
>('curso/eliminarCursoPorId', async (id: string, thunkApi) => {
    try {
        const cursoRes = await eliminarCursoPorIdService(id);
        return cursoRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});
