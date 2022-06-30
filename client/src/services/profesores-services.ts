import axios, { AxiosError, AxiosResponse } from 'axios';
import { Profesor } from '../models/Profesor';

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
};

export const buscarProfesorService = async (): Promise<Profesor[] | null> => {
    try {
        const res = await axios.get<Profesor[]>('http://localhost:5005/api/profesores');
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const crearProfesorService = async (data: Profesor): Promise<Profesor> => {
    try {
      const res = await axios.post<Profesor>(
        'http://localhost:5005/api/profesores',
        data
      );
      return res.data;
    } catch (error) {
      throw manageError(error);
    }
  };
  
  export const buscarProfesorPorIdService = async (id: string): Promise<Profesor> => {
    try {
      const res = await axios.get<Profesor>(`http://localhost:5005/api/profesores/${id}`);
      return res.data;
    } catch (error) {
      throw manageError(error);
    }
  };
  
  export const actualizarProfesorService = async (
    id: string,
    data: Partial<Profesor>
  ) => {
    try {
      const res = await axios.put<Profesor>(
        `http://localhost:5005/api/profesores/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      throw manageError(error);
    }
  };
  
  export const eliminarProfesorPorIdService = async (id: string): Promise<Profesor> => {
    try {
      const res = await axios.delete<Profesor>(
        `http://localhost:5005/api/profesores/${id}`
      );
      return res.data;
    } catch (error) {
      throw manageError(error);
    }
  };