import express from 'express';
import ProfesorController from '../controllers/profesorController';
const router = express.Router();

const controller = new ProfesorController();

router.get('/', controller.getProfesores);

router.get('/:id', controller.getProfesorPorId);

router.post('/', controller.crearProfesor);

router.put('/:id', controller.actualizarProfesor);

router.delete('/:id', controller.eliminarProfesorPorId);

router.get('/dev/crear-set-pruebas', controller.crearSetProuebas);

export default router;
