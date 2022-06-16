import { response, Router } from "express";
import GetMateriaController from "../controller/getMateriaController";

const routerGetMateria = Router();
const getMateriaController = new GetMateriaController();

routerGetMateria.get("/", async(request, response) => {
    await getMateriaController.getMaterias(request,response)
});

export { routerGetMateria }