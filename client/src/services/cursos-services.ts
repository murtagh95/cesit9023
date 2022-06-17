import axios,{AxiosError} from "axios";
import { Curso } from "../models/Curso";


export class CustomError extends Error{
    constructor(public code: number, public message: string){
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

export const buscarCursosService = async (): Promise<Curso[] | null> => {
    try {
        const res = await axios.get<Curso[]>('http://localhost:5005/api/cursos');
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
}
