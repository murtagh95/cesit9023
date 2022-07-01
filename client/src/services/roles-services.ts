import axios, { AxiosError, AxiosResponse } from 'axios';
import { Rol } from '../models/Rol';

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

export const buscarRolService = async (): Promise<Rol[] | null> => {
    try {
        const res = await axios.get<Rol[]>('http://localhost:5005/api/roles');
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const crearRolService = async (data: Rol): Promise<Rol> => {
    try {
      const res = await axios.post<Rol>(
        'http://localhost:5005/api/roles',
        data
      );
      return res.data;
    } catch (error) {
      throw manageError(error);
    }
  };
  
  export const buscarRolPorIdService = async (id: string): Promise<Rol> => {
    try {
      const res = await axios.get<Rol>(`http://localhost:5005/api/roles/${id}`);
      return res.data;
    } catch (error) {
      throw manageError(error);
    }
  };
  
  export const actualizarRolService = async (
    id: string,
    data: Partial<Rol>
  ) => {
    try {
      const res = await axios.put<Rol>(
        `http://localhost:5005/api/roles/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      throw manageError(error);
    }
  };
  
  export const eliminarRolPorIdService = async (id: string): Promise<Rol> => {
    try {
      const res = await axios.delete<Rol>(
        `http://localhost:5005/api/roles/${id}`
      );
      return res.data;
    } catch (error) {
      throw manageError(error);
    }
  };