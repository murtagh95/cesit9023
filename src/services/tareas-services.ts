import axios from 'axios';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Tarea } from '../models/Tarea';
import { back_end_url } from '../utils/constants';
import { manageError } from '../utils/services';

export const buscarTaresService = async (
  criterio?: string,
  page?: number,
  limit?: number
): Promise<PaginatedResponse<Tarea>> => {
  try {
    let uri = `${back_end_url}/api/tareas`;

    let params = '';
    if (criterio) {
      params += `${criterio}`;
    }
    // if (page) {
    //   params += `page=${page}`;
    // }
    // if (limit) {
    //   params += `limit=${limit}`;
    // }
    const res = await axios.get<PaginatedResponse<Tarea>>(`${uri}?${params}`);
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const crearTareaService = async (data: Tarea): Promise<Tarea> => {
  try {
    const res = await axios.post<Tarea>(
      `${back_end_url}/api/tareas`,
      data
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const buscarTareaPorIdService = async (id: string): Promise<Tarea> => {
  try {
    const res = await axios.get<Tarea>(`${back_end_url}/api/tareas/${id}`);
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const actualizarTareaService = async (
  id: string,
  data: Partial<Tarea>
) => {
  try {
    const res = await axios.patch<Tarea>(
      `${back_end_url}/api/tareas/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const eliminarTareaPorIdService = async (id: string): Promise<Tarea> => {
  try {
    const res = await axios.delete<Tarea>(
      `${back_end_url}/api/tareas/${id}`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};
