import express from 'express';
import { connect } from 'mongoose';
import { Tarea } from './models/Tarea';
import tareasRouter from './routes/tareasRoutes'

const PORT = 5005;
const DB_NAME = 'prog3-2022';
const DB_CONN = `mongodb://localhost:27017/${DB_NAME}`;
const server = express();

server.use(express.json());
server.use("/api/tareas", tareasRouter);



const run = async () => {
    await connect(DB_CONN);
    console.log("Se ha conectado a la base de datos");

    server.listen(PORT, () => {
        console.info(`Iniciando servidor en puerto ${PORT}`)
    });

};

run().catch(err => console.log(err));