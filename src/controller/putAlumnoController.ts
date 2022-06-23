import { IAlumno, Alumno } from './../models/Alumno';
import {Request, Response} from 'express';

class PutAlumnoController{
    
    async updateAlumno(req:Request, res:Response){

        let mensaje = []

        const alumnoActualizar = req.body as IAlumno;
        
        const alumno = await Alumno.findById(req.params.id);
        try {
            if(!alumno) {
                return res.send(404).send({message: `No se la tarea con id=${req.params.id}`});
            }
            else{

                if(!alumnoActualizar?.nombre) {
                    mensaje.push("falta el nombre")
                }

                if(!alumnoActualizar?.apellido ) {
                    mensaje.push("falta el apellido")
                }
                
                if(!alumnoActualizar?.dni ) {
                    mensaje.push("falta el dni")
                }
                
                if(!alumnoActualizar?.domicilio ) {
                    mensaje.push("falta el domicilio")
                }
                
                if(!alumnoActualizar?.fechaNacimiento) {
                    mensaje.push("falta la fecha de nacimiento")
                }
                if (mensaje.length>0){
                    res.json({mensaje})
                }
                else{
                    await Alumno.updateOne({_id: alumno._id }, alumnoActualizar);
                    res.json(alumnoActualizar);
                }

    }   
    } catch (error){
        res.send(error)
    }    
        }
  }

    

export default PutAlumnoController;
