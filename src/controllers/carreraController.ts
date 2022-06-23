
import { Request, Response } from 'express';
import { Carrera, ICarrera } from '../models/Carrera';


export const controller = {

    get: async (req: Request, res: Response) => {
        if (req.query.search) {
            const criterioRegEx = new RegExp(req.query.search as string, 'i');
            const criterioDeBusqueda = [
                { nombre: { $regex: criterioRegEx } },

            ];

            const carreras = await Carrera.find({ '$or': criterioDeBusqueda });
            return res.json(carreras);
        }

        const carreras = await Carrera.find();
        res.json(carreras);

    },

    getById: async (req: Request, res: Response) => {

        if (!req.params?.id) {
            return res.status(400).json({ message: "Se deber ingresar el id de la carrera" })
        }
        const carrera = await Carrera.findById(req.params.id);
        if (!carrera) {
            return res.status(404).json({ message: `No se encuentra la carrera con id=${req.params.id}` })
        }
        res.json(carrera);
    },

    post: async (req: Request, res: Response) => {

        const nuevoCarrera = req.body as ICarrera;

        if (!nuevoCarrera?.duracion && !nuevoCarrera?.nombre && !nuevoCarrera?.horario && !nuevoCarrera?.plan) {
            return res.status(400).json({
                message: "faltan datos"
            })
        }

        const carrera = new Carrera(nuevoCarrera);
        await carrera.save();

        res.status(201).json(carrera);
    },


    put: async (req: Request, res: Response) => {


        try {

            if (!req.params?.id) {
                return res.status(400).json({ message: "Se deber ingresar el id del carrera" })
            }
            const carrera = await Carrera.findById(req.params.id);
            if (!carrera) {
                return res.status(404).json({ message: `No se encuentra el carrera con id=${req.params.id}` });
            }

            const carreraActualizar = req.body as ICarrera;


            await Carrera.updateOne({ _id: carrera.id }, carreraActualizar);
            res.json(carreraActualizar);
        } catch (error) {
            res.json({ error })
        }
    },

    delete:async (req: Request, res: Response) => {
        try {
            if (!req.params?.id) {
                return res.status(400).json({ message: "Se deber ingresar el id del carrera" })
            }
            const carrera = await Carrera.findById(req.params.id);
            if (!carrera) {
                return res.status(404).json({ message: `No se la tarea con id=${req.params.id}` })
            }

            await Carrera.deleteOne({ _id: carrera._id })
            res.json(carrera);
        } catch (error) {
            res.json({ error })

        }
    }


}