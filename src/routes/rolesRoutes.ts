import { IRol, Rol } from './../models/Rol';
import express, {Request, Response} from 'express';
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

    if(req.query.search) {
        const criterioRegEx = new RegExp(req.query.search as string, 'i');
        const criterioDeBusqueda = [
            {nombre: { $regex: criterioRegEx }}, 
            {descripcion: { $regex: criterioRegEx }},
        ];

        const roles = await Rol.find({ '$or': criterioDeBusqueda });
        return res.send(roles);
    }

    const roles = await Rol.find();
    res.send(roles);
});

router.get("/:id", async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id del rol"})
    }
    const rol = await Rol.findById(req.params.id);
    if(!rol) {
        return res.send(404).send({message: `No se encuentra al rol con id=${req.params.id}`})
    }
    res.send(rol);
});

router.post("/", async (req: Request, res: Response) => {

    const nuevoRol = req.body as IRol;
    
    if(!nuevoRol?.nombre) {
        return res.status(400).send({
            message: "Debe ingresar el nombre del rol"
        })
    }
    if(!nuevoRol?.descripcion) {
        return res.status(400).send({
            message: "Debe ingresar el apellido del rol"
        })
    }

    const rol = new Rol(nuevoRol);
    await rol.save();

    res.status(201).send(rol);
})

router.put('/:id', async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id del rol"})
    }
    const rol = await Rol.findById(req.params.id);
    if(!rol) {
        return res.send(404).send({message: `No se encuentra el rol con id=${req.params.id}`});
    }

    const rolActualizar = req.body as IRol;
    if(!rolActualizar?.nombre) {
        return res.status(400).send({
            message: "Debe ingresar el nombre del rol"
        })
    }
    if(!rolActualizar?.descripcion) {
        return res.status(400).send({
            message: "Debe ingresar la descripción del rol"
        })
    }
    if(rolActualizar?._id !== rol.id) {
        return res.status(400).send({
            message: "El id no coincide"
        });
    }
    
    await Rol.updateOne({_id: rol.id }, rolActualizar);
    res.send(rolActualizar);
});

router.delete('/:id', async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id del rol"})
    }
    const rol = await Rol.findById(req.params.id);
    if(!rol) {
        return res.send(404).send({message: `No se encuentra al rol con id=${req.params.id}`})
    }

    await Rol.deleteOne({_id: rol._id})
    res.send(rol);
});

export default router;
