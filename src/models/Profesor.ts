import { Schema, model } from 'mongoose';

export interface IProfesor {
    _id?: string;
    nombre: string;
    apellido: string;
    legajo: number;
    edad?: number;
}

const tareaSchema = new Schema<IProfesor>({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    legajo: { type: Number, required: true},
    edad: { type: Number, required: false},

});

export const Profesor = model<IProfesor>('profesores', tareaSchema);
