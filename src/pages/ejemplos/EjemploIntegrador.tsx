import axios from 'axios';
import { useState } from 'react'
import { url_backend } from '../../constants';

interface Tarea {
    _id: string;
    nombre: string;
    descripcion: string;
}

const EjemploIntegrador = () => {

    const [tareas, setTareas] = useState<Tarea[]>([]);

    console.info("--- renderizando");

    const buscarTareasHandler = async () => {
        try {
            const res = await axios.get<Tarea[]>(`${url_backend}/api/tareas`);
            setTareas(res.data);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <>
        <h3>Ejemplo Integrador</h3>
        {JSON.stringify(tareas)}
        <hr />
        <ul>
            {tareas.map(tarea => <li key={tarea._id}>{tarea.nombre}</li>)}
        </ul>
        <button onClick={buscarTareasHandler}>Buscar Tareas</button>
    </>
  )
}

export default EjemploIntegrador