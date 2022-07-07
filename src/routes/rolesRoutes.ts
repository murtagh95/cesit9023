import { Router } from 'express';
import RolController from '../controller/rolController';

const rolesRouter = Router();
const rolController = new RolController();

rolesRouter.put('/:id', async (req, res) => {
  await rolController.updateRol(req, res);
});

rolesRouter.post('/', async (req, res) => {
  await rolController.mandarRol(req, res);
});

rolesRouter.delete('/:id', async (request, response) => {
  await rolController.bajaRol(request, response);
});

rolesRouter.get('/:id', async (request, response) => {
  await rolController.getById(request, response);
});

rolesRouter.get('/', async (request, response) => {
  await rolController.getTasks(request, response);
});

export { rolesRouter };