import { ITarea, Tarea } from './../models/Tarea';
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  if (req.query.search) {
    const criterioRegEx = new RegExp(req.query.search as string, 'i');
    const criterioDeBusqueda = [
      { nombre: { $regex: criterioRegEx } },
      { descripcion: { $regex: criterioRegEx } },
    ];

    const tareas = await Tarea.find({ $or: criterioDeBusqueda });
    return res.send(tareas);
  }

  const tareas = await Tarea.find();
  res.send(tareas);
});

router.get('/:id', async (req: Request, res: Response) => {
  if (!req.params?.id) {
    return res
      .send(400)
      .send({ message: 'Se deber ingresar el id de la tarea' });
  }
  const tarea = await Tarea.findById(req.params.id);
  if (!tarea) {
    return res
      .send(404)
      .send({ message: `No se la tarea con id=${req.params.id}` });
  }
  res.send(tarea);
});

router.post('/', async (req: Request, res: Response) => {
  const nuevaTarea = req.body as ITarea;

  if (!nuevaTarea?.nombre) {
    return res.status(400).send({
      message: 'El nombre no existe',
    });
  }

  const tarea = new Tarea(nuevaTarea);
  await tarea.save();

  res.status(201).send(tarea);
});

router.put('/:id', async (req: Request, res: Response) => {
  if (!req.params?.id) {
    return res
      .send(400)
      .send({ message: 'Se deber ingresar el id de la tarea' });
  }
  const tarea = await Tarea.findById(req.params.id);
  if (!tarea) {
    return res
      .send(404)
      .send({ message: `No se la tarea con id=${req.params.id}` });
  }

  const tareaActualizar = req.body as ITarea;
  if (!tareaActualizar?.nombre) {
    return res.status(400).send({
      message: 'El nombre o id no existe',
    });
  }
  if (tareaActualizar?._id !== tarea.id) {
    return res.status(400).send({
      message: 'El id no coincide',
    });
  }

  await Tarea.updateOne({ _id: tarea.id }, tareaActualizar);
  res.send(tareaActualizar);
});

router.delete('/:id', async (req: Request, res: Response) => {
  if (!req.params?.id) {
    return res
      .send(400)
      .send({ message: 'Se deber ingresar el id de la tarea' });
  }
  const tarea = await Tarea.findById(req.params.id);
  if (!tarea) {
    return res
      .send(404)
      .send({ message: `No se la tarea con id=${req.params.id}` });
  }

  await Tarea.deleteOne({ _id: tarea._id });
  res.send(tarea);
});

export default router;
