import { 
  Button, 
  LinearProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  Link,
  Alert
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { buscarTareas, limpiarTareas } from '../../slices/tareasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const TareasPage = () => {

  const dispatch = useAppDispatch();
  const { cargando, tareas, mensajeError } = useAppSelector(state => state.tarea);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarTareas());

    return () => {
      if(!window.location.pathname.startsWith("/tareas")){
        dispatch(limpiarTareas());
      }
    }
  }, []);

  return (
    <Box>
      <Typography variant='h3'>Listando Tareas</Typography>
      <Button variant="contained" size="small" onClick={()=> navigate("/tareas/nueva")}>Nuevo</Button>
      
      {mensajeError && <Box marginTop={2}>
        <Alert severity="error" color="error">
          {mensajeError}
        </Alert>
      </Box>}

      { cargando ? 
        (<Box marginTop={2}><LinearProgress color="secondary" /></Box>) 
      : (
        !mensajeError && <TableContainer>
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
                  <Link href={`/tareas/${tarea._id}/ver`}>Ver</Link>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      )}      
    </Box>
  )
}

export default TareasPage