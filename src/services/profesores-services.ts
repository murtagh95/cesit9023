import axios, { AxiosError, AxiosResponse } from 'axios';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Profesor } from '../models/Profesor';
import { back_end_url } from '../utils/constants';

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

export const buscarProfesoresService = async (
  criterio?: string,
  page?: number,
  limit?: number
): Promise<PaginatedResponse<Profesor>> => {
  try {
    let uri = `${back_end_url}/api/profesores`;

    let params = '';
    if (criterio) {
      params += `${criterio}`;
    }
    const res = await axios.get<PaginatedResponse<Profesor>>(`${uri}?${params}`);
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const crearProfesorService = async (
  data: Profesor
): Promise<Profesor> => {
  try {
    const res = await axios.post<Profesor>(
      `${back_end_url}/api/profesores`,
      data
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const buscarProfesorPorIdService = async (
  id: string
): Promise<Profesor> => {
  try {
    const res = await axios.get<Profesor>(
      `${back_end_url}/api/profesores/${id}`
    );
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
      `${back_end_url}/api/profesores/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const eliminarProfesorPorIdService = async (
  id: string
): Promise<Profesor> => {
  try {
    const res = await axios.delete<Profesor>(
      `${back_end_url}/api/profesores/${id}`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};
