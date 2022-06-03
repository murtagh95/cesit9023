import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Tarea } from '../../models/Tarea';
import { buscarTaresService } from '../../services/tareas-services';

const TareasPage = () => {

  const [tareas, setTareas] = useState<Tarea[]>([]);

  const navigate = useNavigate();

  useEffect(() => {

    const buscarTareas = async () => {
      const tareasRes = await buscarTaresService();
      setTareas(tareasRes || []);
    }

    buscarTareas();
  }, []);

  
  return (
    <Box>
      <Typography variant='h3'>Listando Tareas</Typography>
      <Button variant="contained" size="small" onClick={()=> navigate("/tareas/nueva")}>Nuevo</Button>
      
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Finalizada?</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {tareas.map(tarea => (
              <TableRow
                key={tarea._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {tarea.nombre}
                </TableCell>
                <TableCell align="right">true</TableCell>
                <TableCell align="right">
                  <Link to={`/tareas/${tarea._id}/ver`}>Ver</Link>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TareasPage