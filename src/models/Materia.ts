import { Schema, model } from 'mongoose';
import { IModeloBase, modeloBase } from './ModeloBase';

export enum CondicionMateria {
  Regular = 'regular',
  Promocion = 'promocion',
  Libre = 'libre',
  Recursa = 'recursa',
}
export interface IMaterias extends IModeloBase {
  _id?: string;
  nombre: string;
  profesor: string;
  duracion: number;
  condicionMateria: CondicionMateria;
}

const MateriaSchema = new Schema<IMaterias>({
  ...modeloBase,
  nombre: { type: String, required: true },
  profesor: { type: String, require: true },
  duracion: { type: Number, required: true },
  condicionMateria: {
    type: String,
    enum: Object.values(CondicionMateria),
    required: true,
  },
});

export const Materia = model<IMaterias>('materias', MateriaSchema);
