import axios, { AxiosError } from "axios";
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Curso } from "../models/Curso";
import { back_end_url } from "../utils/constants";


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


export const buscarCursosService = async (
    criterio?: string,
): Promise<PaginatedResponse<Curso>> => {
    try {
        let uri = `${back_end_url}/api/cursos`;

        let params = '';
        if (criterio) {
            params += `${criterio}`;
        }
        const res = await axios.get<PaginatedResponse<Curso>>(`${uri}?${params}`);
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};



export const crearCursoService = async (curso: Curso): Promise<Curso | null> => {
    try {
        const res = await axios.post<Curso>(`${back_end_url}/api/cursos`, curso);
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
}

export const buscarCursoPorIdService = async (id: string): Promise<Curso> => {
    try {
        const res = await axios.get<Curso>(`${back_end_url}/api/cursos/${id}`);
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const actualizarCursoService = async (
    id: string,
    data: Partial<Curso>
) => {
    let body = {
        anio: data.anio,
        cantidadAlumnos: data.cantidadAlumnos,
        carrera: data.carrera,
        bedelia: data.bedelia,
    }
    try {
        const res = await axios.patch<Curso>(
            `${back_end_url}/api/cursos/${id}`,
            body
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const eliminarCursoPorIdService = async (id: string): Promise<Curso> => {
    try {
        const res = await axios.delete<Curso>(
            `${back_end_url}/api/cursos/${id}`
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};


