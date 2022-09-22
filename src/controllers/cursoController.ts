
import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import { Curso, ICurso } from '../models/Curso';
import PaginatedResponse from '../models/responses/PaginatedResponse';
import { getLimit, getSkip } from '../utils/controlleres/utils';
import { randomIntFromInterval } from '../utils/numbers';


function getBedelia(parametro: string) {
    return { bedelia: { $regex: new RegExp(parametro, 'i') } };
}

function getCarrera(parametro: string) {
    return { carrera: { $regex: new RegExp(parametro, 'i') } };
}

function getAll(parametro: string) {
    const criterioRegEx = new RegExp(parametro, 'i');
    return [
        { bedelia: { $regex: criterioRegEx } },
        { carrera: { $regex: criterioRegEx } },
    ];
}
class CursoController {

    async getCurso(req: Request, res: Response) {
        const posiblesBusquedas: any = {
            bedelia: getBedelia,
            carrera: getCarrera,
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
        const cursos = await Curso.find(parametrosFiltro).skip(skip).limit(limit);
        const count = await Curso.count(parametrosFiltro);
        return res.send(new PaginatedResponse<ICurso>(cursos, skip, limit, count));
    }

    async getCursoById(req: Request, res: Response) {

        if (!req.params?.id) {
            return res.status(400).json({ message: "Se deber ingresar el id del curso" })
        }
        const cursos = await Curso.findById(req.params.id);
        if (!cursos) {
            return res.status(404).json({ message: `No se la cursos con id=${req.params.id}` })
        }
        res.json(cursos);
    }

    async crearCurso(req: Request, res: Response) {

        const nuevoCurso = req.body as ICurso;

        if (!nuevoCurso?.anio && !nuevoCurso?.cantidadAlumnos && !nuevoCurso?.carrera && !nuevoCurso?.bedelia) {
            return res.status(400).json({
                message: "faltan datos"
            })
        }

        const curso = new Curso(nuevoCurso);
        await curso.save();

        res.status(201).json(curso);
    }


    async actualizarCurso(req: Request, res: Response) {

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
    }

    async eliminarCursoPorId(req: Request, res: Response) {
        try {
            if (!req.params?.id) {
                return res.status(400).json({ message: "Se deber ingresar el id del curso" })
            }
            const curso = await Curso.findById(req.params.id);
            if (!curso) {
                return res.status(404).json({ message: `No se encuentra el curso con id=${req.params.id}` })
            }

            await Curso.deleteOne({ _id: curso._id })
            res.json(curso);
        } catch (error) {
            res.json({ error })

        }
    }

    async crearSetProuebas(req: Request, res: Response) {
        await Curso.remove({});
        for (let i = 0; i < 100; i++) {
            const nuevaCurso = {
                anio: randomIntFromInterval(0, 5),
                cantidadAlumnos: randomIntFromInterval(0, 80),
                carrera: faker.lorem.paragraph(3),
                bedelia: faker.lorem.paragraph(3),
            } as ICurso;
            const curso = new Curso(nuevaCurso);
            await curso.save();
        }
        res.send({});
    }


}

export default CursoController;