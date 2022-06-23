import {Request, Response} from "express";
import { IAlumno , Alumno} from "../models/Alumno";



class PostAlumnoController {

    async mandarAlumno(req: Request, res: Response){
        try {
            const nuevoAlumno = req.body as IAlumno;
            if (nuevoAlumno.nombre|| nuevoAlumno.apellido || nuevoAlumno.dni||nuevoAlumno.domicilio || nuevoAlumno.fechaNacimiento) {
                const alumno = new Alumno(nuevoAlumno);
                await alumno.save();


                return res.status(201).send(alumno);
                
            }
        } catch (error) {
            res.status(400).json({
                message: "Completar todos los datos"
            })
        }
    }   
    
}

export default PostAlumnoController
    