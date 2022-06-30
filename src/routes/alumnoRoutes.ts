import { Router } from 'express';
import AlumnoController from '../controller/alumnoController';

const alumnoRouter = Router();
const alumnoController = new AlumnoController();

alumnoRouter.put('/:id', async (req, res) => {
  await alumnoController.updateAlumno(req, res);
});

alumnoRouter.post('/', async (req, res) => {
  await alumnoController.mandarAlumno(req, res);
});

alumnoRouter.delete('/:id', async (request, response) => {
  await alumnoController.bajaAlumno(request, response);
});

alumnoRouter.get('/:id', async (request, response) => {
  await alumnoController.getById(request, response);
});

alumnoRouter.get('/', async (request, response) => {
  await alumnoController.getTasks(request, response);
});

export { alumnoRouter };
