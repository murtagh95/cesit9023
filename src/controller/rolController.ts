import { IRol, Rol } from './../models/Rol';
import { Request, Response } from 'express';

function getNombre(parametro: string) {
    return { nombre: { $regex: new RegExp(parametro, 'i') } };
}

function getDescripcion(parametro: string) {
    return { descripcion: { $regex: new RegExp(parametro, 'i') } };
}


function getBusquedaTotal(parametro: string) {
    const criterioRegEx = new RegExp(parametro, 'i');
    return [
        { nombre: { $regex: criterioRegEx } },
        { descripcion: { $regex: criterioRegEx } },
    ];
}

class RolController {
    async getTasks(request: Request, response: Response) {
        let roles: IRol[] = [];

        if (Object.keys(request.query).length != 0) {
            const posiblesBusquedas: any = {
                nombre: getNombre,
                descripcion: getDescripcion,
                busqueda: getBusquedaTotal,
            };

            const criterioDeBusqueda = [];
            for (const [key, value] of Object.entries(request.query)) {
                if (posiblesBusquedas[key] !== undefined) {
                    if (key === 'busqueda') {
                        criterioDeBusqueda.push(...posiblesBusquedas[key](value));
                    } else {
                        criterioDeBusqueda.push(posiblesBusquedas[key](value));
                    }
                }
            }
        }

        roles = await Rol.find();

        return response.send(roles);
    }

    async getById(req: Request, res: Response) {
        if (!req.params?.id) {
            return res
                .status(400)
                .json({ message: 'Se deber ingresar el id del rol' });
        }
        const rol = await Rol.findById(req.params.id);
        if (!rol) {
            return res
                .status(404)
                .json({ message: `No se encuentra el rol con id=${req.params.id}` });
        }
        res.json(rol);
    }

    async bajaRol(req: Request, res: Response) {
        const { id } = req.params;
        const rol = await Rol.findOneAndUpdate(
            { _id: id },
            { baja: true, fechaActualizacion: new Date() },
            { new: true }
        );
        try {
            if (rol) {
                res.send(rol);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async mandarRol(req: Request, res: Response) {
        try {
            const nuevoRol = req.body as IRol;
            if (
                nuevoRol.nombre ||
                nuevoRol.descripcion
            ) {
                const rol = new Rol(nuevoRol);
                await rol.save();

                return res.status(201).send(rol);
            }
        } catch (error) {
            res.status(400).json({
                message: 'Completar todos los datos',
            });
        }
    }

    async updateRol(req: Request, res: Response) {
        const mensaje = [];

        const rolActualizar = req.body as IRol;

        const rol = await Rol.findById(req.params.id);
        try {
            if (!rol) {
                return res
                    .send(404)
                    .send({ message: `No se la tarea con id=${req.params.id}` });
            } else {
                if (!rolActualizar?.nombre) {
                    mensaje.push('falta el nombre');
                }

                if (!rolActualizar?.descripcion) {
                    mensaje.push('falta la descripcion');
                }
                if (mensaje.length > 0) {
                    res.json({ mensaje });
                } else {
                    await Rol.updateOne({ _id: rol._id }, rolActualizar);
                    res.json(rolActualizar);
                }
            }
        } catch (error) {
            res.send(error);
        }
    }
}

export default RolController;