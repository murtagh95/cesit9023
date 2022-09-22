import { IAlumno, Alumno } from '../models/Alumno';
import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import PaginatedResponse from '../models/responses/PaginatedResponse';
import { getLimit, getSkip } from '../utils/controlleres/utils';

function getNombre(parametro: string) {
  return { nombre: { $regex: new RegExp(parametro, 'i') } };
}

function getApellido(parametro: string) {
  return { apellido: { $regex: new RegExp(parametro, 'i') } };
}

function getDni(parametro: string) {
  return { dni: { $regex: new RegExp(parametro, 'i') } };
}

function getDomicilio(parametro: string) {
  return { domicilio: { $regex: new RegExp(parametro, 'i') } };
}

function getBusquedaTotal(parametro: string) {
  const criterioRegEx = new RegExp(parametro, 'i');
  return [
    { nombre: { $regex: criterioRegEx } },
    { apellido: { $regex: criterioRegEx } },
    { dni: { $regex: criterioRegEx } },
    { domicilio: { $regex: criterioRegEx } },
  ];
}

class AlumnoController {
  async getTasks(request: Request, response: Response) {
    let alumnos: IAlumno[] = [];
    const criterioDeBusqueda = [];

    if (Object.keys(request.query).length != 0) {
      const busquedas: any = {
        nombre: getNombre,
        apellido: getApellido,
        dni: getDni,
        domicilio: getDomicilio,
        busqueda: getBusquedaTotal,
      };

      for (const [key, value] of Object.entries(request.query)) {
        if (!['limit', 'skip'].includes(key) && busquedas[key] !== undefined) {
          if (key === 'busqueda') {
            criterioDeBusqueda.push(...busquedas[key](value));
          } else {
            criterioDeBusqueda.push(busquedas[key](value));
          }
        }
      }
    }
    let parametrosFiltro: any = criterioDeBusqueda.length
      ? {
          $or: criterioDeBusqueda,
          $and: [{ baja: false }],
        }
      : {};

    const limit = getLimit(request);
    const skip = getSkip(request);

    alumnos = await Alumno.find(parametrosFiltro).skip(skip).limit(limit);
    const count = await Alumno.count(parametrosFiltro);

    return response.send(
      new PaginatedResponse<IAlumno>(alumnos, skip, limit, count)
    );
  }

  async getById(req: Request, res: Response) {
    if (!req.params?.id) {
      return res
        .status(400)
        .json({ message: 'Se deber ingresar el id del alumno' });
    }
    const alumno = await Alumno.findById(req.params.id);

    if (!alumno) {
      return res
        .status(404)
        .json({ message: `No se encuentra el alumno con id=${req.params.id}` });
    }
    res.json(alumno);
  }

  async bajaAlumno(req: Request, res: Response) {
    const { id } = req.params;
    const alumno = await Alumno.findOneAndUpdate(
      { _id: id },
      { baja: true, fechaActualizacion: new Date() },
      { new: true }
    );
    try {
      if (alumno) {
        res.send(alumno);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async mandarAlumno(req: Request, res: Response) {
    try {
      const nuevoAlumno = req.body as IAlumno;
      if (
        nuevoAlumno.nombre ||
        nuevoAlumno.apellido ||
        nuevoAlumno.dni ||
        nuevoAlumno.domicilio ||
        nuevoAlumno.fechaNacimiento
      ) {
        const alumno = new Alumno(nuevoAlumno);
        await alumno.save();

        return res.status(201).send(alumno);
      }
    } catch (error) {
      res.status(400).json({
        message: 'Completar todos los datos',
      });
    }
  }

  async updateAlumno(req: Request, res: Response) {
    const mensaje = [];

    const alumnoActualizar = req.body as IAlumno;

    const alumno = await Alumno.findById(req.params.id);
    try {
      if (!alumno) {
        return res
          .send(404)
          .send({ message: `No se la tarea con id=${req.params.id}` });
      } else {
        if (!alumnoActualizar?.nombre) {
          mensaje.push('falta el nombre');
        }

        if (!alumnoActualizar?.apellido) {
          mensaje.push('falta el apellido');
        }

        if (!alumnoActualizar?.dni) {
          mensaje.push('falta el dni');
        }

        if (!alumnoActualizar?.domicilio) {
          mensaje.push('falta el domicilio');
        }

        if (!alumnoActualizar?.fechaNacimiento) {
          mensaje.push('falta la fecha de nacimiento');
        }
        if (mensaje.length > 0) {
          res.json({ mensaje });
        } else {
          await Alumno.updateOne({ _id: alumno._id }, alumnoActualizar);
          res.json(alumnoActualizar);
        }
      }
    } catch (error) {
      res.send(error);
    }
  }

  // https://fakerjs.dev/
  async crearSetProuebas(req: Request, res: Response) {
    await Alumno.remove({});
    for (let i = 0; i < 100; i++) {
      const nuevoAlumno = {
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        dni: faker.random.numeric(10),
        domicilio: faker.address.streetName(),
        // baja: Boolean(),
        fechaNacimiento: faker.date.birthdate({
          min: 1950,
          max: 2022,
          mode: 'year',
        }),
        fechaCreacion: faker.date.birthdate({
          min: 1950,
          max: 2022,
          mode: 'year',
        }),
        fechaActualizacion: faker.date.birthdate({
          min: 1950,
          max: 2022,
          mode: 'year',
        }),
      } as IAlumno;
      const alumno = new Alumno(nuevoAlumno);
      await alumno.save();
    }
    res.send({});
  }
}

export default AlumnoController;
