import { AxiosError } from 'axios';

export class CustomError extends Error {
  constructor(public code: number, public message: string) {
    super(message);
  }
}

export const manageError = (error: unknown): CustomError => {
  if (error instanceof AxiosError) {
    return new CustomError(error?.response?.status || 400, error.message);
  } else {
    return new CustomError(500, 'Error desconocido');
  }
};
