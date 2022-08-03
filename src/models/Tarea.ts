import { Schema, model } from 'mongoose';

export interface ITarea {
  _id?: string;
  nombre: string;
  descripcion?: string;
  finalizada?: boolean;
  fechaLimite?: Date;
  progreso?: number;
}

const tareaSchema = new Schema<ITarea>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: false },
  finalizada: { type: Boolean, default: false },
  fechaLimite: { type: Date, required: false },
  progreso: { type: Number, required: false },
});

export const Tarea = model<ITarea>('tareas', tareaSchema);
