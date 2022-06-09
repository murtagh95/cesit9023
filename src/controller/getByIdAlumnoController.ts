import {Request, Response} from "express";
import { Alumno } from "../models/Alumno";


class GetByIdAlumnoController {

    async getById(req: Request, res: Response) {
        if (!req.params?.id) {
            return res.status(400).json({ message: "Se deber ingresar el id del alumno" })
        }
        const alumno = await Alumno.findById(req.params.id);
        if (!alumno) {
            return res.status(404).json({ message: `No se encuentra el alumno con id=${req.params.id}` })
        }
        res.json(alumno);
        }
}
export default GetByIdAlumnoController
