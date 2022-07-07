
import { Request, Response } from 'express';
import { Carrera, ICarrera } from '../models/Carrera';

class CarreraController {
    async getCarreras(req: Request, res: Response) {
        if (req.query.search) {
            const criterioRegEx = new RegExp(req.query.search as string, 'i');
            const criterioDeBusqueda = [
                { nombre: { $regex: criterioRegEx } },
                { descripcion: { $regex: criterioRegEx } },
            ];

            const carreras = await Carrera.find({ $or: criterioDeBusqueda });
            return res.send(carreras);
        }

        const carreras = await Carrera.find();
        res.send(carreras);
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
}

export default CarreraController;





