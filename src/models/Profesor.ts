import { Schema, model } from 'mongoose';

export interface IProfesor {
    _id?: string;
    nombre: string;
    apellido: string;
    dni: number;
    fechaNacimiento: Date;
}

const profesorSchema = new Schema<IProfesor>({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true},
    fechaNacimiento: { type: Date, required: true},

});

export const Profesor = model<IProfesor>('profesores', profesorSchema);
