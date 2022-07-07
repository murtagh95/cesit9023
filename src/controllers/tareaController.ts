import { Request, Response } from 'express';
import { ITarea, Tarea } from '../models/Tarea';

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
    if (Object.keys(req.query).length != 0) {
      const posiblesBusquedas: any = {
        nombre: getNombre,
        descripcion: getDescripcion,
        _todos: getAll,
      };

      const criterioDeBusqueda = [];
      for (const [key, value] of Object.entries(req.query)) {
        if (posiblesBusquedas[key] !== undefined) {
          if (key === '_todos') {
            criterioDeBusqueda.push(...posiblesBusquedas[key](value));
          } else {
            criterioDeBusqueda.push(posiblesBusquedas[key](value));
          }
        }
      }

      let parametrosFiltro: any = { $or: criterioDeBusqueda };

      const tareas = await Tarea.find(parametrosFiltro);
      return res.send(tareas);
    }

    const tareas = await Tarea.find();
    res.send(tareas);
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
}

export default TareaController;
