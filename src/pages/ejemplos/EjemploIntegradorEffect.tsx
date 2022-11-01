import axios from 'axios';
import { useEffect, useState } from 'react';
import { back_end_url } from '../../utils/constants';

interface Tarea {
  _id: string;
  nombre: string;
  descripcion: string;
}

const EjemploIntegradorEffect = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [sumador, setSumador] = useState<number>(10);

  useEffect(() => {
    buscarTareasHandler();
  }, []);

  useEffect(() => {
    console.info('--> dentro de sumador', sumador);
  }, [sumador]);

  console.info('^^^renderizando componente');

  const buscarTareasHandler = async () => {
    try {
      const res = await axios.get<Tarea[]>(`${back_end_url}/api/tareas`);
      setTareas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h3>Ejemplo Integrador con effect</h3>
        <b>{sumador}</b>
        <button onClick={() => setSumador(sumador + 1)}>Sumar</button>
      </div>
      <div>
        {JSON.stringify(tareas)}
        <hr />
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea._id}>{tarea.nombre}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EjemploIntegradorEffect;
