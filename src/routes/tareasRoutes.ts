import express, {Request, Response} from 'express';
import { Tarea } from '../models/Tarea'
const router = express.Router();

let tareas: Tarea[] = [
    { id: 1, nombre: "Uno" },
    { id: 2, nombre: "Dos" },
    { id: 3, nombre: "Tres" },
];

router.get("/", (req: Request, res: Response) => {
    res.send(tareas);
});

router.get("/:id", (req: Request, res: Response) => {
    if(!req.params?.id) {
        res.send(400).send({message: "Se deber ingresar el id de la tarea"})
    }
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if(!tarea) {
        res.send(404).send({message: `No se la tarea con id=${req.params.id}`})
    }
    res.send(tarea);
});

router.post("/", (req: Request, res: Response) => {

    const nuevaTarea = req.body as Tarea;
    
    if(!nuevaTarea?.nombre) {
        res.status(400).send({
            message: "El nombre no existe"
        })
    }

    nuevaTarea.id = tareas[tareas.length - 1].id + 1;
    tareas.push(nuevaTarea);

    res.status(201).send(nuevaTarea);
})

router.put('/:id', (req: Request, res: Response) => {
    if(!req.params?.id) {
        res.send(400).send({message: "Se deber ingresar el id de la tarea"})
    }
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if(!tarea) {
        res.send(404).send({message: `No se la tarea con id=${req.params.id}`});
        return;
    }

    const tareaActualizar = req.body as Tarea;
    if(!tareaActualizar?.nombre) {
        res.status(400).send({
            message: "El nombre o id no existe"
        })
    } else {
        tareaActualizar.id = tarea?.id;
    }

    tareas = tareas.map(t => t.id === parseInt(req.params.id) ? tareaActualizar : t);
    res.send(tareaActualizar);
});

router.delete('/:id', (req: Request, res: Response) => {
    if(!req.params?.id) {
        res.send(400).send({message: "Se deber ingresar el id de la tarea"})
    }
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if(!tarea) {
        res.send(404).send({message: `No se la tarea con id=${req.params.id}`})
    }

    tareas = tareas.filter(t => t.id !== parseInt(req.params.id));
    res.send(tarea);
});

export default router;
