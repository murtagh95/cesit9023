import axios, { AxiosError } from 'axios';
import { Carrera } from '../models/Carrera';


export class CustomError extends Error {
    constructor(public code: number, public message: string) {
        super(message)
    }
}

const manageError = (error: unknown): CustomError => {
    if( error instanceof AxiosError){
        return new CustomError(error?.response?.status || 400, error.message);
    } else {
        return new CustomError(500, "Error desconocido");
    }
}

export const buscarCarrerasService = async (): Promise<Carrera[] | null> => {
    try {
        const res = await axios.get<Carrera[]>('http://localhost:5005/api/carreras');
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
}

export const crearCarreraService = async (carrera: Carrera): Promise<Carrera | null> => {
    try {
        const res = await axios.post<Carrera>('http://localhost:5005/api/carreras', carrera);
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
}

