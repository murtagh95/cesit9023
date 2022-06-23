import { Schema, model } from 'mongoose';

export interface ICurso {
    _id?: string;
    anio: number;
    cantidadAlumnos: number;
    carrera: string;
    bedelia: string; 
}

const cursoSchema = new Schema<ICurso>({
    anio: { type: Number, required: true },
    cantidadAlumnos: { type: Number, required: true },
    carrera: { type: String, required: true },
    bedelia: { type: String, required: true },
});

export const Curso = model<ICurso>('curso', cursoSchema);
