import { Alumno } from "../models/Alumno";
import { Request, Response } from 'express';

export class BajaAlumnosController  {

    async bajaAlumno(req: Request, res: Response) {
       
        const {id} = req.params        
        const alumno = await Alumno.findOneAndUpdate(
            {_id: id},
            {baja: true,fechaActualizacion: new Date},
            {new: true}  
        );
        try {
            if (alumno){
              res.send(alumno);
            }
        } catch (error) {
            console.error(error);
        }
    }                  
}

