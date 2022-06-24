export interface IModeloBase {
    _id?: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    baja: boolean;

}

export const modeloBase = {
	fechaCreacion: { type: Date, required: true, default: new Date },
	fechaActualizacion: { type: Date, required: true, default: new Date },
	baja: { type: Boolean, required: true, default: false }
};
