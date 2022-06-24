import { Schema, model } from 'mongoose';

export interface ITarea {
    _id?: string;
    nombre: string;
    descripcion?: string;
}

const tareaSchema = new Schema<ITarea>({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: false },
});

export const Tarea = model<ITarea>('tareas', tareaSchema);
