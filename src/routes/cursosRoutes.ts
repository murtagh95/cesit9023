
import express from 'express';
import CursoController from '../controllers/cursoController';



const router = express.Router();

const controller = new CursoController

router.get("/", controller.getCurso);

router.get("/:id", controller.getCursoById);

router.post("/", controller.crearCurso);

router.put('/:id', controller.actualizarCurso);

router.delete('/:id', controller.eliminarCursoPorId);

export default router;
