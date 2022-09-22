
import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import { Carrera, ICarrera } from '../models/Carrera';
import PaginatedResponse from '../models/responses/PaginatedResponse';
import { getLimit, getSkip } from '../utils/controlleres/utils';
import { randomIntFromInterval } from '../utils/numbers';


function getNombre(parametro: string) {
    return { nombre: { $regex: new RegExp(parametro, 'i') } };
}

function getDuracion(parametro: string) {
    return { duracion: { $regex: new RegExp(parametro, 'i') } };
}

function getAll(parametro: string) {
    const criterioRegEx = new RegExp(parametro, 'i');
    return [
        { nombre: { $regex: criterioRegEx } },
        { duracion: { $regex: criterioRegEx } },
    ];
}
class CarreraController {
    async getCarreras(req: Request, res: Response) {
        const posiblesBusquedas: any = {
            nombre: getNombre,
            duracion: getDuracion,
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
        const carreras = await Carrera.find(parametrosFiltro).skip(skip).limit(limit);
        const count = await Carrera.count(parametrosFiltro);
        return res.send(new PaginatedResponse<ICarrera>(carreras, skip, limit, count));
    }
    async getCarreraPorId(req: Request, res: Response) {
        if (!req.params?.id) {
            return res
                .send(400)
                .send({ message: 'Se deber ingresar el id de la carrera' });
        }
        const carrera = await Carrera.findById(req.params.id);
        if (!carrera) {
            return res
                .send(404)
                .send({ message: `No se encuentra la carrera con id=${req.params.id}` });
        }
        res.send(carrera);
    }

    async crearCarrera(req: Request, res: Response) {
        const nuevaCarrera = req.body as ICarrera;

        if (!nuevaCarrera?.duracion && !nuevaCarrera?.nombre && !nuevaCarrera?.horario && !nuevaCarrera?.plan) {
            return res.status(400).json({
                message: "faltan datos"
            })
        }

        const carrera = new Carrera(nuevaCarrera);
        await carrera.save();

        res.status(201).send(carrera);
    }

    async actualizarCarrera(req: Request, res: Response) {
        if (!req.params?.id) {
            return res
                .send(400)
                .send({ message: 'Se deber ingresar el id de la carrera' });
        }
        const carrera = await Carrera.findById(req.params.id);
        if (!carrera) {
            return res
                .send(404)
                .send({ message: `No se encuentra la carrera con id=${req.params.id}` });
        }

        const carreraActualizar = req.body as ICarrera;
        if (!carreraActualizar?.nombre) {
            return res.status(400).send({
                message: 'El nombre o id no existe',
            });
        }
        if (carreraActualizar?._id !== carrera.id) {
            return res.status(400).send({
                message: 'El id no coincide',
            });
        }

        await Carrera.updateOne({ _id: carrera.id }, carreraActualizar);
        res.send(carreraActualizar);
    }

    async eliminarCarreraPorId(req: Request, res: Response) {
        if (!req.params?.id) {
            return res
                .send(400)
                .send({ message: 'Se deber ingresar el id de la carrera' });
        }
        const carrera = await Carrera.findById(req.params.id);
        if (!carrera) {
            return res
                .send(404)
                .send({ message: `No se la carrera con id=${req.params.id}` });
        }

        await Carrera.deleteOne({ _id: carrera._id });
        res.send(carrera);
    }
    async crearSetProuebas(req: Request, res: Response) {
        await Carrera.remove({});
        for (let i = 0; i < 100; i++) {
            const nuevaCarrera = {
                nombre: `${i} ${i % 2 ? 'abc' : 'xyz'} - ${faker.lorem.sentence(6)}`,
                duracion: randomIntFromInterval(0, 5).toString(),
                horario: faker.lorem.paragraph(3),
                plan: faker.lorem.paragraph(3),
            } as ICarrera;
            const carrera = new Carrera(nuevaCarrera);
            await carrera.save();
        }
        res.send({});
    }
}

export default CarreraController;





