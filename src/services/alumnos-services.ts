import axios, { AxiosError, AxiosResponse } from 'axios';
import { url_backend } from '../constants';
import { Alumno } from '../models/Alumno';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';

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

export const buscarAlumnosService = async (
  criterio?: string
): Promise<PaginatedResponse<Alumno>> => {
  try {
    let uri = `${url_backend}/api/alumnos`;

    let params = '';
    if (criterio) {
      params += `${criterio}`;
    }
    const res = await axios.get<PaginatedResponse<Alumno>>(`${uri}?${params}`);
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const crearAlumnoService = async (data: Alumno): Promise<Alumno> => {
  try {
    const res = await axios.post<Alumno>(
      `${url_backend}/api/alumnos`,
      data
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const buscarAlumnoPorIdService = async (id: string): Promise<Alumno> => {
  try {
    const res = await axios.get<Alumno>(
      `${url_backend}/api/alumnos/${id}`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const actualizarAlumnoService = async (
  id: string,
  data: Partial<Alumno>
) => {
  let body = { nombre: data.nombre, apellido : data.apellido, dni: data.dni, domicilio: data.domicilio, fechaNacimiento: data.fechaNacimiento};
  try {
    const res = await axios.patch<Alumno>(
      `${url_backend}/api/alumnos/${id}`,
      body
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const eliminarAlumnosPorIdService = async (
  id: string
): Promise<Alumno> => {
  try {
    const res = await axios.delete<Alumno>(
      `${url_backend}/api/alumnos/${id}`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};
