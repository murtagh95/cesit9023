import { Schema, model } from "mongoose";

export interface ICarrera {
    _id?: string;
    nombre: string;
    duracion: string;
    horario: string;
    plan: string;
}
const carreraSchema = new Schema<ICarrera>({
    nombre: { type: String, required: true },
    duracion: { type: String, required: true },
    horario: { type: String, required: true },
    plan: { type: String, required: true },

});

export const Carrera = model<ICarrera>('carrera', carreraSchema);