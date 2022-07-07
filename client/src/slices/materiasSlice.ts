
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Materia } from '../models/Materia';
import {
    buscarMateriaPorIdService,
    buscarMateriaService,
    CustomError,
    eliminarMateriaPorIdService,
} from '../services/materias-services';


// Define a type for the slice state
interface MateriasState {
    materias: Materia[];
    materiaSeleccionada: Materia | null;
    cargando: boolean;
    cantidadMaterias: number;
    mensajeError: string | null;
}

// Define the initial state using that type
const initialState: MateriasState = {
    materias: [],
    materiaSeleccionada: null,
    cargando: false,
    cantidadMaterias: 0,
    mensajeError: null,
};

export const materiasSlice = createSlice({
    name: 'materia',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setCargando: (state, { payload }: PayloadAction<boolean>) => {
            state.cargando = payload;
        },
        limpiarMaterias: (state) => {
            state.materias = initialState.materias;
            state.cantidadMaterias = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(buscarMaterias.pending, (state) => {
            state.cargando = true;
            state.cantidadMaterias = 0;
            state.mensajeError = null;
        });
        builder.addCase(
            buscarMaterias.fulfilled,
            (state, { payload }: PayloadAction<Materia[] | null>) => {
                state.materias = payload || [];
                state.cargando = false;
                state.cantidadMaterias = state.materias.length;
            }
        );
        builder.addCase(
            buscarMaterias.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );
        builder.addCase(buscarMateriaPorId.pending, (state) => {
            state.cargando = true;
            state.mensajeError = null;
        });
        builder.addCase(
            buscarMateriaPorId.fulfilled,
            (state, { payload }: PayloadAction<Materia | null>) => {
                state.materiaSeleccionada = payload || null;
                state.cargando = false;
            }
        );
        builder.addCase(
            buscarMateriaPorId.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );
        builder.addCase(eliminarMateriaPorId.pending, (state) => {
            state.cargando = true;
            state.mensajeError = null;
        });
        builder.addCase(
            eliminarMateriaPorId.fulfilled,
            (state, { payload }: PayloadAction<Materia | null>) => {
                state.materiaSeleccionada = null;
                state.materias = state.materias.filter(
                    (materia) => materia._id !== payload?._id
                );
                state.cargando = false;
            }
        );
        builder.addCase(
            eliminarMateriaPorId.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );
    },
});

export const { setCargando, limpiarMaterias } = materiasSlice.actions;

export default materiasSlice.reducer;

// Extra reducers

type MateriaRes = Materia[] | null;

export const buscarMaterias = createAsyncThunk<
    MateriaRes,
    void,
    { rejectValue: CustomError }
>('materia/buscarMaterias', async (_: void, thunkApi) => {
    try {
        const materiaRes = await buscarMateriaService();
        return materiaRes || [];
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});

export const buscarMateriaPorId = createAsyncThunk<
    Materia,
    string,
    { rejectValue: CustomError }
>('materia/buscarMateriaPorId', async (id: string, thunkApi) => {
    try {
        const materiaRes = await buscarMateriaPorIdService(id);
        return materiaRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});

export const eliminarMateriaPorId = createAsyncThunk<
    Materia,
    string,
    { rejectValue: CustomError }
>('materia/eliminarMateriaPorId', async (id: string, thunkApi) => {
    try {
        const materiaRes = await eliminarMateriaPorIdService(id);
        return materiaRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});
