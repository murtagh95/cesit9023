export interface  Alumno {
    _id?: string;
    nombre: string;
    apellido: string;
    dni: number;
    domicilio: string;
    fechaNacimiento: Date | undefined;
}
