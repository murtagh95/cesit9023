import axios, { AxiosError, AxiosResponse } from 'axios';
import { Alumno } from '../models/Alumno';

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

export const buscarAlumnosService = async (): Promise<Alumno[] | null> => {
  try {
    const res = await axios.get<Alumno[]>('http://localhost:5005/api/alumnos');
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const crearAlumnoService = async (data: Alumno): Promise<Alumno> => {
  try {
    const res = await axios.post<Alumno>(
      'http://localhost:5005/api/alumnos',
      data
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const buscarAlumnoPorIdService = async (id: string): Promise<Alumno> => {
  try {
    const res = await axios.get<Alumno>(`http://localhost:5005/api/alumnos/${id}`);
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const actualizarAlumnoService = async (
  id: string,
  data: Partial<Alumno>
) => {
  try {
    const res = await axios.put<Alumno>(
      `http://localhost:5005/api/alumnos/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const eliminarAlumnosPorIdService = async (id: string): Promise<Alumno> => {
  try {
    const res = await axios.delete<Alumno>(
      `http://localhost:5005/api/alumnos/${id}`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};
