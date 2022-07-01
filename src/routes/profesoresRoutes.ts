import { IProfesor, Profesor } from './../models/Profesor';
import express, {Request, Response} from 'express';
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

    if(req.query.search) {
        const criterioRegEx = new RegExp(req.query.search as string, 'i');
        const criterioDeBusqueda = [
            {nombre: { $regex: criterioRegEx }}, 
            {apellido: { $regex: criterioRegEx }},
            {dni: {$regex: criterioRegEx}},
            {edad: {$regex: criterioRegEx}},
        ];

        const profesores = await Profesor.find({ '$or': criterioDeBusqueda });
        return res.send(profesores);
    }

    const profesores = await Profesor.find();
    res.send(profesores);
});

router.get("/:id", async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id del profesor"})
    }
    const profesor = await Profesor.findById(req.params.id);
    if(!profesor) {
        return res.send(404).send({message: `No se encuentra al profesor con id=${req.params.id}`})
    }
    res.send(profesor);
});

router.post("/", async (req: Request, res: Response) => {

    const nuevoProfesor = req.body as IProfesor;
    
    if(!nuevoProfesor?.nombre) {
        return res.status(400).send({
            message: "Debe ingresar el nombre del profesor"
        })
    }
    if(!nuevoProfesor?.apellido) {
        return res.status(400).send({
            message: "Debe ingresar el apellido del profesor"
        })
    }
    if (!nuevoProfesor?.dni) {
        return res.status(400).send({
            message: "Debe ingresar el número de DNI del profesor"
        })
    }
    if (!nuevoProfesor?.edad) {
        return res.status(400).send({
            message: "Debe ingresar la edad del profesor"
        })
    }

    const profesor = new Profesor(nuevoProfesor);
    await profesor.save();

    res.status(201).send(profesor);
})

router.put('/:id', async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id del profesor"})
    }
    const profesor = await Profesor.findById(req.params.id);
    if(!profesor) {
        return res.send(404).send({message: `No se encuentra el profesor con id=${req.params.id}`});
    }

    const profesorActualizar = req.body as IProfesor;
    if(!profesorActualizar?.nombre) {
        return res.status(400).send({
            message: "Debe ingresar el nombre del profesor"
        })
    }
    if(!profesorActualizar?.apellido) {
        return res.status(400).send({
            message: "Debe ingresar el apellido del profesor"
        })
    }
    if(!profesorActualizar?.dni) {
        return res.status(400).send({
            message: "Debe ingresar el número de DNI del profesor"
        })
    }
    if(!profesorActualizar?.edad) {
        return res.status(400).send({
            message: "Debe ingresar la edad del profesor"
        })
    }
    if(profesorActualizar?._id !== profesor.id) {
        return res.status(400).send({
            message: "El id no coincide"
        });
    }
    
    await Profesor.updateOne({_id: profesor.id }, profesorActualizar);
    res.send(profesorActualizar);
});

router.delete('/:id', async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id del profesor"})
    }
    const profesor = await Profesor.findById(req.params.id);
    if(!profesor) {
        return res.send(404).send({message: `No se encuentra al profesor con id=${req.params.id}`})
    }

    await Profesor.deleteOne({_id: profesor._id})
    res.send(profesor);
});

export default router;
