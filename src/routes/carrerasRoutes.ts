
import express from 'express';
import CarreraController from '../controllers/carreraController';


const router = express.Router();

const controller = new CarreraController();

router.get("/", controller.getCarreras);

router.get("/:id", controller.getCarreraPorId);

router.post("/", controller.crearCarrera);

router.put('/:id', controller.actualizarCarrera);

router.delete('/:id', controller.eliminarCarreraPorId);

router.get('/dev/crear-set-pruebas', controller.crearSetProuebas);


export default router;
