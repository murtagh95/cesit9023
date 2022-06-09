import Router from 'express';
import { BajaAlumnosController } from '../controller/deleteAlumnoController';


const routerBajaAlumno = Router()
const alumnoController = new BajaAlumnosController()

routerBajaAlumno.delete("/:id", async (request, response) => {
     await alumnoController.bajaAlumno(request, response);
});

export { routerBajaAlumno };
