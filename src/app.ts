import express from 'express';
import tareasRouter from './routes/tareasRoutes'

const PORT = 5005;
const server = express();

server.use(express.json());
server.use("/api/tareas", tareasRouter);

server.listen(PORT, () => {
    console.info(`Iniciando servidor en puerto ${PORT}`)
});