import express from 'express';

const PORT = 5005;
const server = express();

server.get("/", (req, res) => {
    res.send("<html><body><h1>Hola Mundo</h1></body></html>");
});

server.listen(PORT, () => {
    console.info(`Iniciando servidor en puerto ${PORT}`)
});