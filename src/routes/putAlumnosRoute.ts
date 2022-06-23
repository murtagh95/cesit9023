import { Router } from "express";
import PutAlumnoController from "../controller/putAlumnoController";


const routerPutAlumno = Router();
const alumnoController = new PutAlumnoController();

routerPutAlumno.put("/:id",async (req, res) =>{
    await alumnoController.updateAlumno (req,res);
})

export { routerPutAlumno };
