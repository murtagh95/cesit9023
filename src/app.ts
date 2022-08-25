import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import cookieSession from 'cookie-session';

// Routes
import { routerMateria } from './routes/materiaRouter';
import { alumnoRouter } from './routes/alumnoRoutes';
import tareasRouter from './routes/tareaRoutes';
import cursosRouter from './routes/cursosRoutes';
import carrerasRouter from './routes/carrerasRoutes';
import profesoresRouter from './routes/profesoresRoutes';
import { rolesRouter } from './routes/rolesRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import { currentUser } from './middlewares/current-user';

dotenv.config();
const PORT = process.env.PORT || 5005;
const DB_NAME = process.env.DB_NAME || 'prog3-2022';
const DB_CONN =
  (process.env.MONGO_DB || 'mongodb://localhost:27017/') + `${DB_NAME}`;
const server = express();

// Middleware
if (process.env.ENVIRONMENT != 'production') {
  server.use(morgan('dev'));
}
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
server.use(currentUser);

// Router
server.use('/api/tareas', tareasRouter);
server.use('/api/alumnos', alumnoRouter);
server.use('/api/materias', routerMateria);
server.use('/api/cursos', cursosRouter);
server.use('/api/carreras', carrerasRouter);
server.use('/api/profesores', profesoresRouter);
server.use('/api/roles', rolesRouter);
server.use('/api/usuarios', usuarioRoutes);

const run = async () => {
  await connect(DB_CONN);
  console.log('Se ha conectado a la base de datos');

  server.listen(PORT, () => {
    console.info(`Iniciando servidor en puerto ${PORT}`);
  });
};

run().catch((err) => console.log(err));
