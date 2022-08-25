import { Request, Response } from 'express';
import { IUsuario, Usuario } from '../models/Usuario';
import { faker } from '@faker-js/faker';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController {
  async postRegistrar(req: Request, res: Response) {
    try {
      const { nombre, email, password } = req.body as IUsuario;
      if (!nombre || !email || !password) {
        return res.json({ message: 'Nombre, email y password son requeridos' });
      }

      // Se revisa que el usuario no exista
      const userExist = await Usuario.findOne({ email: req.body.email });
      if (userExist) {
        return res.json({
          message: 'El usuario ya existe para el email ingresado',
        });
      }
      //Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
      const user = new Usuario(req.body);
      await user.save();

      const jwtToken = await jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY!,
        {
          expiresIn: process.env.JWT_EXPIRE!,
        }
      );

      req.session = {
        token: jwtToken,
      };

      return res.json({
        success: true,
        message: 'Usuario registrado correctamente',
        data: user,
      });
    } catch (error) {
      return res.json({ error: error });
    }
  }

  async postLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ message: 'Por favor, ingrese credenciales' });
      }

      const usuario = await Usuario.findOne({ email: req.body.email });
      if (!usuario) {
        return res.json({ message: 'Credenciales inválidas' });
      }

      const passwordCoincide = await bcrypt.compare(password, usuario.password);
      if (!passwordCoincide) {
        return res.json({ message: 'Credenciales inválidas' });
      }

      const jwtToken = await jwt.sign(
        { id: usuario._id },
        process.env.SECRET_KEY!,
        {
          expiresIn: process.env.JWT_EXPIRE!,
        }
      );
      req.session = {
        token: jwtToken,
      };
      return res.json({ success: true, message: 'Ingreso exitoso' });
    } catch (error) {
      return res.json({ error: error });
    }
  }

  async postLogout(req: Request, res: Response) {
    req.session = null;

    res.send({});
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await Usuario.find();
      return res.json(users);
    } catch (error) {
      return res.json({ error: error });
    }
  }

  async crearSetProuebas(req: Request, res: Response) {}
}

export default UserController;
