import Router from 'express';
import { GetMateriaByIdController } from '../controller/getMateriaByIdController';



const routerGetById = Router()
const materiaController = new GetMateriaByIdController()

routerGetById.get("/:id", async (request, response) => {
     await materiaController.getMateriaById(request, response);
});

export { routerGetById };
