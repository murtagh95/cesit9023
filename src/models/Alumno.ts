import { Schema, model } from 'mongoose';
import { IModeloBase, modeloBase } from "./ModeloBase";


export interface IAlumno extends IModeloBase{
    nombre: string;
    apellido: string;
    dni: number;
    domicilio: string
    fechaNacimiento: Date

}

const alumnoSchema = new Schema<IAlumno>({
    ...modeloBase,
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true },
    domicilio: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
});

export const Alumno = model<IAlumno>('alumnos', alumnoSchema);
