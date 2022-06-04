import { Schema, model } from 'mongoose';


export interface IAlumno {
    _id?: string;
    nombre: string;
    apellido: string;
    dni: number;
    domicilio: string
    fechaNacimiento: Date

}

const alumnoSchema = new Schema<IAlumno>({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true },
    domicilio: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
});

export const Alumno = model<IAlumno>('alumnos', alumnoSchema);
