import { Router } from "express";
import PostMateriaController from "../controller/postMateriaController";

const routerPostMateria = Router();
const materiaController = new PostMateriaController();

routerPostMateria.post("/",async (req, res) =>{
    await materiaController.postMateria (req,res);
})

export default routerPostMateria
