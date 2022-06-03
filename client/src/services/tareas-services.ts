import axios, { AxiosResponse } from 'axios';
import { Tarea } from '../models/Tarea';

export const buscarTaresService = async (): Promise<Tarea[] | null> => {
    try {
        const res = await axios.get<Tarea[]>('http://localhost:5005/api/tareas');
        return res.data;
    } catch (error) {
        return null;
    }
}