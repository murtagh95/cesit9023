import { IMaterias, Materia  } from "../models/Materia"
import { Request, Response } from "express";

class DeleteMateriaController {

    async bajaLogica (req: Request, res:Response) {
        const {_id} = req.params

        try {
            const materia = await Materia.findOneAndUpdate(
                {_id: _id},
                {baja: true, fechaActualizacion: new Date()},
                {new: true}
            );
            
            if (materia) {
                res.json(materia)
            };
        } catch (error) {
            res.json(error)
        };

    };

};

export default DeleteMateriaController;