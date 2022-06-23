import { Router, Request, Response } from "express";
import DeleteMateriaController from "../controller/deleteMateriaController";

const routerDeleteMateria = Router();
const materiaController = new DeleteMateriaController();

routerDeleteMateria.delete("/:_id",async (req: Request, res: Response) => {
    await materiaController.bajaLogica(req, res);
});

export { routerDeleteMateria };