import { Request, Response } from 'express';
import { IRol, Rol } from '../models/Rol';

class RolController {
  async getRoles(req: Request, res: Response) {
    if (req.query.search) {
      const criterioRegEx = new RegExp(req.query.search as string, 'i');
      const criterioDeBusqueda = [
        { nombre: { $regex: criterioRegEx } },
        { descripcion: { $regex: criterioRegEx } },
      ];

      const roles = await Rol.find({ $or: criterioDeBusqueda });
      return res.send(roles);
    }

    const roles = await Rol.find();
    res.send(roles);
  }

  async getRolPorId(req: Request, res: Response) {
    if (!req.params?.id) {
      return res
        .send(400)
        .send({ message: 'Se deber ingresar el id del rol' });
    }
    const rol = await Rol.findById(req.params.id);
    if (!rol) {
      return res
        .send(404)
        .send({ message: `No se la encuentra el rol con id=${req.params.id}` });
    }
    res.send(rol);
  }

  async crearRol(req: Request, res: Response) {
    const nuevaRol = req.body as IRol;

    if (!nuevaRol?.nombre) {
      return res.status(400).send({
        message: 'El nombre no existe',
      });
    }

    const rol = new Rol(nuevaRol);
    await rol.save();

    res.status(201).send(rol);
  }

  async actualizarRol(req: Request, res: Response) {
    if (!req.params?.id) {
      return res
        .send(400)
        .send({ message: 'Se deber ingresar el id del rol' });
    }
    const rol = await Rol.findById(req.params.id);
    if (!rol) {
      return res
        .send(404)
        .send({ message: `No se encuentra el rol con id=${req.params.id}` });
    }

    const rolActualizar = req.body as IRol;
    if (!rolActualizar?.nombre) {
      return res.status(400).send({
        message: 'El nombre o id no existe',
      });
    }
    if (rolActualizar?._id !== rol.id) {
      return res.status(400).send({
        message: 'El id no coincide',
      });
    }

    await Rol.updateOne({ _id: rol.id }, rolActualizar);
    res.send(rolActualizar);
  }

  async eliminarRolPorId(req: Request, res: Response) {
    if (!req.params?.id) {
      return res
        .send(400)
        .send({ message: 'Se deber ingresar el id del rol' });
    }
    const rol = await Rol.findById(req.params.id);
    if (!rol) {
      return res
        .send(404)
        .send({ message: `No se encuentra el rol con id=${req.params.id}` });
    }

    await Rol.deleteOne({ _id: rol._id });
    res.send(rol);
  }
}

export default RolController;