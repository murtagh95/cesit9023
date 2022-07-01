import { Schema, model } from 'mongoose';

export interface IRol {
    _id?: string;
    nombre: string;
    descripcion: string;
}

const tareaSchema = new Schema<IRol>({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
});

export const Rol = model<IRol>('roles', tareaSchema);
