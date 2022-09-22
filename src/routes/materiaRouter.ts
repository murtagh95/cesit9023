import { Request, Response, Router } from 'express';
import { MateriaController } from '../controllers/materiaController';

const routerMateria = Router();
const materiaController = new MateriaController();

routerMateria.post('/', async (req, res) => {
  await materiaController.postMateria(req, res);
});

routerMateria.put('/:id', async (request, respose) => {
  await materiaController.updateMateria(request, respose);
});

routerMateria.get('/', async (request, response) => {
  await materiaController.getMaterias(request, response);
});

routerMateria.delete('/:id', async (req: Request, res: Response) => {
  await materiaController.bajaLogica(req, res);
});

routerMateria.get('/:id', async (request, response) => {
  await materiaController.getMateriaById(request, response);
});

routerMateria.get('/dev/crear-set-pruebas', async (request, response) => {
  await materiaController.crearSetProuebas(request, response);
});

export { routerMateria };
