import { Request, Response } from 'express';
import { Materia, IMaterias } from '../models/Materia';

function getNombre(parametro: string) {
  return { nombre: { $regex: new RegExp(parametro, 'i') } };
}

function getProfesor(parametro: string) {
  return { profesor: { $regex: new RegExp(parametro, 'i') } };
}

function getBusquedaTotal(parametro: string) {
  const regex = new RegExp(parametro, 'i');
  return [{ nombre: { $regex: regex } }, { profesor: { $regex: regex } }];
}

class MateriaController {
  async bajaLogica(req: Request, res: Response) {
    const { _id } = req.params;

    try {
      const materia = await Materia.findOneAndUpdate(
        { _id: _id },
        { baja: true, fechaActualizacion: new Date() },
        { new: true }
      );

      if (materia) {
        res.json(materia);
      }
    } catch (error) {
      res.json(error);
    }
  }

  async getMateriaById(req: Request, res: Response) {
    try {
      const materia = await Materia.findById(req.params.id);
      if (materia) {
        res.send(materia);
      }
    } catch (error) {
      if (!req.params?.id) {
        return res
          .send(400)
          .send({ message: 'Se deber ingresar el id de la tarea' });
      }
      if (error) {
        return res
          .send(404)
          .send({ message: `No se la tarea con id=${req.params.id}` });
      }
    }
  }

  async getMaterias(request: Request, response: Response) {
    let materias: IMaterias[] = [];

    if (Object.keys(request.query).length != 0) {
      const busquedas: any = {
        nombre: getNombre,
        profesor: getProfesor,
        busqueda: getBusquedaTotal,
      };

      const criterioDeBusqueda = [];
      for (const [key, value] of Object.entries(request.query)) {
        if (busquedas[key] !== undefined) {
          if (key === 'busqueda') {
            criterioDeBusqueda.push(...busquedas[key](value));
          } else {
            criterioDeBusqueda.push(busquedas[key](value));
          }
        }
      }
    }
    materias = await Materia.find();

    return response.send(materias);
  }

  async postMateria(req: Request, res: Response) {
    const nuevaMateria = req.body as IMaterias;

    if (
      !nuevaMateria?.nombre ||
      !nuevaMateria?.profesor ||
      !nuevaMateria?.condicionMateria ||
      !nuevaMateria?.duracion
    ) {
      return res.status(400).json({
        message: 'Faltan datos por llenar',
      });
    }

    const materia = new Materia(nuevaMateria);
    await materia.save();

    res.status(201).json(materia);
  }

  async updateAlumno(req: Request, res: Response) {
    const mensaje = [];

    const materiaActualizar = req.body as IMaterias;

    const materia = await Materia.findById(req.params.id);

    try {
      if (!materia) {
        return res
          .send(404)
          .send({ message: `No se el materia con id=${req.params.id}` });
      } else {
        if (!materiaActualizar?.nombre) {
          mensaje.push('falta el nombre');
        }

        if (!materiaActualizar?.profesor) {
          mensaje.push('falta el profesor');
        }

        if (!materiaActualizar?.duracion) {
          mensaje.push('falta el duracion');
        }

        if (!materiaActualizar?.condicionMateria) {
          mensaje.push('falta el condicionMateria');
        }
        if (mensaje.length > 0) {
          res.json({ mensaje });
        } else {
          await Materia.updateOne(
            { _id: materia.id },
            { fechaActualizacion: new Date() },
            materiaActualizar
          );
          res.json(materiaActualizar);
        }
      }
    } catch (error) {
      res.json(error);
    }
  }
}

export { MateriaController };
