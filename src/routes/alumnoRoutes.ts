import { Router } from "express";
import GetAlumnoController  from "../controller/getAlumnoContorller";


const routerGetAlumno = Router()
const alumnoController = new GetAlumnoController()

routerGetAlumno.get("/", async (request, response) => {
    await alumnoController.getTasks(request, response);
});

export { routerGetAlumno };

