import {Request, Response} from "express"
import { Materia } from "../models/Materia";


class GetMateriaByIdController {
    async getMateriaById(req: Request, res: Response) {
        try {
            const materia = await Materia.findById(req.params.id);
            if (materia){
                res.send(materia);
            }
        } catch (error) {
            if(!req.params?.id) {
                return res.send(400).send({message: "Se deber ingresar el id de la tarea"})
            }
            if(error) {
                return res.send(404).send({message: `No se la tarea con id=${req.params.id}`})
            }
            
        }
    };
    
}

export {GetMateriaByIdController}
