import { IMaterias, Materia } from '../models/Materia';
import {Request, Response} from 'express';

class PostMateriaController{

    async postMateria(req:Request, res:Response){
        const nuevaMateria = req.body as IMaterias;

        if (!nuevaMateria?.nombre|| !nuevaMateria?.profesor || !nuevaMateria?.condicionMateria|| !nuevaMateria?.duracion) {
            return res.status(400).json({
                message: "Faltan datos por llenar"
            })
        }

        const materia = new Materia(nuevaMateria);
        await materia.save();

        res.status(201).json(materia);
    }
}

export default PostMateriaController;

