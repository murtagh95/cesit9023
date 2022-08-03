import express from 'express';
import TareaController from '../controllers/tareaController';
const router = express.Router();

const controller = new TareaController();

router.get('/', controller.getTareas);

router.get('/:id', controller.getTareaPorId);

router.post('/', controller.crearTarea);

router.put('/:id', controller.actualizarTarea);

router.delete('/:id', controller.eliminarTareaPorId);

router.get('/dev/crear-set-pruebas', controller.crearSetProuebas);

export default router;
