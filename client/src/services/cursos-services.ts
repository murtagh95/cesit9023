import axios, { AxiosError } from "axios";
import { Curso } from "../models/Curso";


export class CustomError extends Error {
    constructor(public code: number, public message: string) {
        super(message)
    }
}

const manageError = (error: unknown): CustomError => {
    if (error instanceof AxiosError) {
        return new CustomError(error?.response?.status || 400, error.message);
    } else {
        return new CustomError(500, "Error desconocido");
    }
}

export const buscarCursosService = async (): Promise<Curso[] | null> => {
    try {
        const res = await axios.get<Curso[]>('http://localhost:5005/api/cursos');
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
}

export const crearCursoService = async (curso: Curso): Promise<Curso | null> => {
    try {
        const res = await axios.post<Curso>('http://localhost:5005/api/cursos', curso);
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
}

export const buscarCursoPorIdService = async (id: string): Promise<Curso> => {
    try {
        const res = await axios.get<Curso>(`http://localhost:5005/api/cursos/${id}`);
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const actualizarCursoService = async (
    id: string,
    data: Partial<Curso>
) => {
    try {
        const res = await axios.put<Curso>(
            `http://localhost:5005/api/cursos/${id}`,
            data
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const eliminarCursoPorIdService = async (id: string): Promise<Curso> => {
    try {
        const res = await axios.delete<Curso>(
            `http://localhost:5005/api/cursos/${id}`
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};


