import { Request, Response } from 'express';
import { IProfesor, Profesor } from '../models/Profesor';
import { faker } from '@faker-js/faker';
import PaginatedResponse from '../models/responses/PaginatedResponse';
import { getLimit, getSkip } from '../utils/controlleres/utils';

function getNombre(parametro: string) {
  return { nombre: { $regex: new RegExp(parametro, 'i') } };
}

function getApellido(parametro: string) {
  return { apellido: { $regex: new RegExp(parametro, 'i') } };
}

// function getDNI(parametro: number) {
//   return { dni: { $regex: new RegExp(parametro, 'i') } };
// }

// function getFechaNach(parametro: Date) {
//   return { fechaNac: { $regex: new RegExp(parametro, 'i') } };
// }

function getAll(parametro: string) {
  const criterioRegEx = new RegExp(parametro, 'i');
  return [
    { nombre: { $regex: criterioRegEx } },
    { apellido: { $regex: criterioRegEx } },
    // { dni: { $regex: criterioRegEx } },
    // { fechaNac: { $regex: criterioRegEx } },
  ];
}

class ProfesorController {
  async getProfesores(req: Request, res: Response) {
    const posiblesBusquedas: any = {
      nombre: getNombre,
      apellido: getApellido,
      // dni: getDNI,
      // fechaNac: getFechaNach,
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
    const profesores = await Profesor.find(parametrosFiltro)
      .skip(skip)
      .limit(limit);
    const count = await Profesor.count(parametrosFiltro);
    return res.send(
      new PaginatedResponse<IProfesor>(profesores, skip, limit, count)
    );
  }

  async getProfesorPorId(req: Request, res: Response) {
    if (!req.params?.id) {
      return res
        .send(400)
        .send({ message: 'Se deber ingresar el id del profesor' });
    }
    const profesor = await Profesor.findById(req.params.id);
    if (!profesor) {
      return res
        .send(404)
        .send({ message: `No se encontró el profesor con id=${req.params.id}` });
    }
    res.send(profesor);
  }

  async crearProfesor(req: Request, res: Response) {
    const nuevaProfesor = req.body as IProfesor;

    if (!nuevaProfesor?.nombre) {
      return res.status(400).send({
        message: 'El nombre no existe',
      });
    }

    const profesor = new Profesor(nuevaProfesor);
    await profesor.save();

    res.status(201).send(profesor);
  }

  async actualizarProfesor(req: Request, res: Response) {
    if (!req.params?.id) {
      return res
        .send(400)
        .send({ message: 'Se deber ingresar el id del profesor' });
    }
    const profesor = await Profesor.findById(req.params.id);
    if (!profesor) {
      return res
        .send(404)
        .send({ message: `No se encontró el profesor con id=${req.params.id}` });
    }

    const profesorActualizar = req.body as IProfesor;
    if (!profesorActualizar?.nombre) {
      return res.status(400).send({
        message: 'El nombre o id no existe',
      });
    }
    if (profesorActualizar?._id !== profesor.id) {
      return res.status(400).send({
        message: 'El id no coincide',
      });
    }

    await Profesor.updateOne({ _id: profesor.id }, profesorActualizar);
    res.send(profesorActualizar);
  }

  async eliminarProfesorPorId(req: Request, res: Response) {
    if (!req.params?.id) {
      return res
        .send(400)
        .send({ message: 'Se deber ingresar el id del profesor' });
    }
    const profesor = await Profesor.findById(req.params.id);
    if (!profesor) {
      return res
        .send(404)
        .send({ message: `No se encontró el profesor con id=${req.params.id}` });
    }

    await Profesor.deleteOne({ _id: profesor._id });
    res.send(profesor);
  }

  // https://fakerjs.dev/
  async crearSetProuebas(req: Request, res: Response) {
    await Profesor.remove({});
    for (let i = 0; i < 100; i++) {
      const nuevaProfesor = {
        nombre: `${i} ${i % 2 ? 'abc' : 'xyz'} - ${faker.lorem.sentence(6)}`,
        apellido: `${i} ${i % 2 ? 'abc' : 'xyz'} - ${faker.lorem.sentence(6)}`,
        // dni: `${faker.lorem.words(num: number = 8)}`,
        fechaNacimiento: new Date(faker.date.soon()),
      } as IProfesor;
      const profesor = new Profesor(nuevaProfesor);
      await profesor.save();
    }
    res.send({});
  }
}

export default ProfesorController;
