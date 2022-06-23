import { Request, Response } from "express";
import { Materia, IMaterias } from "../models/Materia";


class PutMateriaController{
    async updateAlumno(req:Request, res:Response){
        let mensaje = []
        
        const materiaActualizar = req.body as IMaterias;

        const materia = await Materia.findById(req.params.id);

        try {
            if(!materia) {
                return res.send(404).send({message: `No se el materia con id=${req.params.id}`});
            }
            else {
                if(!materiaActualizar?.nombre) {
                    mensaje.push("falta el nombre")
                }

                if(!materiaActualizar?.profesor ) {
                    mensaje.push("falta el profesor")
                }

                if(!materiaActualizar?.duracion ) {
                    mensaje.push("falta el duracion")
                }

                if(!materiaActualizar?.condicionMateria ) {
                    mensaje.push("falta el condicionMateria")
                }
                if (mensaje.length>0){
                    res.json({mensaje})
                }
                else{
                    await Materia.updateOne(
                    {_id: materia.id }, {fechaActualizacion: new Date()}, materiaActualizar);
                    res.json(materiaActualizar);
                }
            };
            
        } catch (error) {
           res.json(error)
        };
    };
};

export {PutMateriaController};
