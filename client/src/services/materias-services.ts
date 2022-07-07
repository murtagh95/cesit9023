import axios, { AxiosError, AxiosResponse } from 'axios';
import { Materia } from '../models/Materia';

export class CustomError extends Error {
    constructor(public code: number, public message: string) {
        super(message);
    }
}

const manageError = (error: unknown): CustomError => {
    if (error instanceof AxiosError) {
        return new CustomError(error?.response?.status || 400, error.message);
    } else {
        return new CustomError(500, 'Error desconocido');
    }
};

export const buscarMateriaService = async (): Promise<Materia[] | null> => {
    try {
        const res = await axios.get<Materia[]>('http://localhost:5005/api/materias');
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const crearMateriaService = async (data: Materia): Promise<Materia> => {
    try {
        const res = await axios.post<Materia>(
            'http://localhost:5005/api/materias',
            data
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const buscarMateriaPorIdService = async (id: string): Promise<Materia> => {
    try {
        const res = await axios.get<Materia>(`http://localhost:5005/api/materias/${id}`);
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const actualizarMateriaService = async (
    id: string,
    data: Partial<Materia>
) => {
    try {
        const res = await axios.put<Materia>(
            `http://localhost:5005/api/materias/${id}`,
            data
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const eliminarMateriaPorIdService = async (id: string): Promise<Materia> => {
    try {
        const res = await axios.delete<Materia>(
            `http://localhost:5005/api/materias/${id}`
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};