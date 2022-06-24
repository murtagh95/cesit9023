
import { Request, Response } from 'express';
import { Curso, ICurso } from '../models/Curso';


export const controller = {

    get: async (req: Request, res: Response) => {
        if (req.query.search) {
            const criterioRegEx = new RegExp(req.query.search as string, 'i');
            const criterioDeBusqueda = [
                { anio: { $regex: criterioRegEx } },
                { carrera: { $regex: criterioRegEx } }

            ];

            const cursos = await Curso.find({ '$or': criterioDeBusqueda });
            return res.json(cursos);
        }

        const cursos = await Curso.find();
        res.json(cursos);

    },

    getById: async (req: Request, res: Response) => {

        if (!req.params?.id) {
            return res.status(400).json({ message: "Se deber ingresar el id del curso" })
        }
        const cursos = await Curso.findById(req.params.id);
        if (!cursos) {
            return res.status(404).json({ message: `No se la cursos con id=${req.params.id}` })
        }
        res.json(cursos);
    },

    post: async (req: Request, res: Response) => {

        const nuevoCurso = req.body as ICurso;

        if (!nuevoCurso?.anio && !nuevoCurso?.cantidadAlumnos && !nuevoCurso?.carrera && !nuevoCurso?.bedelia) {
            return res.status(400).json({
                message: "faltan datos"
            })
        }

        const curso = new Curso(nuevoCurso);
        await curso.save();

        res.status(201).json(curso);
    },


    put: async (req: Request, res: Response) => {

        try {

            if (!req.params?.id) {
                return res.status(400).json({ message: "Se deber ingresar el id del curso" })
            }
            const curso = await Curso.findById(req.params.id);
            if (!curso) {
                return res.status(404).json({ message: `No se encuentra el curso con id=${req.params.id}` });
            }

            const cursoActualizar = req.body as ICurso;


            await Curso.updateOne({ _id: curso.id }, cursoActualizar);
            res.json(cursoActualizar);
        } catch (error) {
            res.json({ error })
        }
    },

    delete:async (req: Request, res: Response) => {
        try {
            if (!req.params?.id) {
                return res.status(400).json({ message: "Se deber ingresar el id del curso" })
            }
            const curso = await Curso.findById(req.params.id);
            if (!curso) {
                return res.status(404).json({ message: `No se la tarea con id=${req.params.id}` })
            }

            await Curso.deleteOne({ _id: curso._id })
            res.json(curso);
        } catch (error) {
            res.json({ error })

        }
    }


}