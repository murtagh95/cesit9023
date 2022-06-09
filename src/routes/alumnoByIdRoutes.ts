import { Router } from "express";
import GetByIdAlumnoController from "../controller/getByIdAlumnoController";


const routerGetByIdAlumno = Router()
const alumnoByIdController = new GetByIdAlumnoController()

routerGetByIdAlumno.get("/:id", async (request, response)=>{
    await alumnoByIdController.getById(request,response)
} );

export default routerGetByIdAlumno
