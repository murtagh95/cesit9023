import { Request, Response } from 'express';
import { ITarea, Tarea } from '../models/Tarea';
import { faker } from '@faker-js/faker';
import { randomIntFromInterval } from '../utils/numbers';
import PaginatedResponse from '../models/responses/PaginatedResponse';
import { getLimit, getSkip } from '../utils/controlleres/utils';

function getNombre(parametro: string) {
  return { nombre: { $regex: new RegExp(parametro, 'i') } };
}

function getDescripcion(parametro: string) {
  return { descripcion: { $regex: new RegExp(parametro, 'i') } };
}

function getAll(parametro: string) {
  const criterioRegEx = new RegExp(parametro, 'i');
  return [
    { nombre: { $regex: criterioRegEx } },
    { descripcion: { $regex: criterioRegEx } },
  ];
}

class TareaController {
  async getTareas(req: Request, res: Response) {
    const posiblesBusquedas: any = {
      nombre: getNombre,
      descripcion: getDescripcion,
      _todos: getAll,
    };

    const criterioDeBusqueda = [];

    for (const [key, value] of Object.entries(req.query)) {
      if (
        !['limit', 'skip'].includes(key) &&
        posiblesBusquedas[key] !== undefined
      ) {
        if (key === '_todos') {
          criterioDeBusqueda.push(...posiblesBusquedas[key](value));
        } else {
          criterioDeBusqueda.push(posiblesBusquedas[key](value));
        }
      }
    }

    let parametrosFiltro: any = criterioDeBusqueda.length
      ? { $or: criterioDeBusqueda }
      : {};

    const limit = getLimit(req);
    const skip = getSkip(req);
    const tareas = await Tarea.find(parametrosFiltro).skip(skip).limit(limit);
    const count = await Tarea.count(parametrosFiltro);
    return res.send(new PaginatedResponse<ITarea>(tareas, skip, limit, count));
  }

  async getTareaPorId(req: Request, res: Response) {
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
  }

  async crearTarea(req: Request, res: Response) {
    const nuevaTarea = req.body as ITarea;

    if (!nuevaTarea?.nombre) {
      return res.status(400).send({
        message: 'El nombre no existe',
      });
    }

    const tarea = new Tarea(nuevaTarea);
    await tarea.save();

    res.status(201).send(tarea);
  }

  async actualizarTarea(req: Request, res: Response) {
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
  }

  async eliminarTareaPorId(req: Request, res: Response) {
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
  }

  // https://fakerjs.dev/
  async crearSetProuebas(req: Request, res: Response) {
    await Tarea.remove({});
    for (let i = 0; i < 100; i++) {
      const nuevaTarea = {
        nombre: `${i} ${i % 2 ? 'abc' : 'xyz'} - ${faker.lorem.sentence(6)}`,
        descripcion: faker.lorem.paragraph(3),
        finalizada: Boolean(Math.random() < 0.5),
        fechaLimite: new Date(faker.date.soon()),
        progreso: randomIntFromInterval(0, 100),
      } as ITarea;
      const tarea = new Tarea(nuevaTarea);
      await tarea.save();
    }
    res.send({});
  }
}

export default TareaController;
