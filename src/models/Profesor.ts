import { Schema, model } from 'mongoose';

export interface IProfesor {
    _id?: string;
    nombre: string;
    apellido: string;
    dni: number;
    edad?: number;
}

const tareaSchema = new Schema<IProfesor>({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true},
    edad: { type: Number, required: true},

});

export const Profesor = model<IProfesor>('profesores', tareaSchema);
