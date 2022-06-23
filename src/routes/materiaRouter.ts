import { Router } from "express";
import { PutMateriaController } from "../controller/putMateriaController";

const routerPutMateria = Router();
const putMateriaController = new PutMateriaController();

routerPutMateria.put("/:id",async (request, respose) => {
    await putMateriaController.updateAlumno (request,respose);
})


export { routerPutMateria };