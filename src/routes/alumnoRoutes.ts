import { Router } from 'express';
import AlumnoController from '../controllers/alumnoController';

const alumnoRouter = Router();
const alumnoController = new AlumnoController();

alumnoRouter.put('/:id', alumnoController.updateAlumno);

alumnoRouter.post('/', alumnoController.mandarAlumno);

alumnoRouter.delete('/:id', alumnoController.bajaAlumno);

alumnoRouter.get('/:id', alumnoController.getById);

alumnoRouter.get('/', alumnoController.getTasks);

alumnoRouter.get('/dev/crear-set-pruebas', alumnoController.crearSetProuebas);

export { alumnoRouter };
