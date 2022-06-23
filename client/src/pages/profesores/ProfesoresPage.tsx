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
import { buscarProfesores, limpiarProfesores } from '../../slices/profesoresSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const ProfesoresPage = () => {

  const dispatch = useAppDispatch();
  const { cargando, profesores, mensajeError } = useAppSelector(state => state.profesor);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarProfesores());

    return () => {
      if (!window.location.pathname.startsWith("/profesores")) {
        dispatch(limpiarProfesores());
      }
    }
  }, []);

  return (
    <Box>
      <Typography variant='h3'>Listando Profesores</Typography>
      <Button variant="contained" size="small" onClick={() => navigate("/profesores/nuevo")}>Nuevo</Button>

      {mensajeError && <Box marginTop={2}>
        <Alert severity="error" color="error">
          {mensajeError}
        </Alert>
      </Box>}

      {cargando ?
        (<Box marginTop={2}><LinearProgress color="secondary" /></Box>)
        : (
          !mensajeError && <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Apellido</TableCell>
                  <TableCell align="right">Legajo</TableCell>
                  <TableCell align="right">Edad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {profesores.map(profesor => (
                  <TableRow
                    key={profesor._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {profesor.nombre}
                    </TableCell>
                    <TableCell align="right">{profesor.apellido}</TableCell>
                    <TableCell align="right">{profesor.legajo}</TableCell>
                    <TableCell align="right">{profesor.edad}</TableCell>
                    <TableCell align="right">
                      <Link href={`/profesores/${profesor._id}/ver`}>Ver</Link>
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

export default ProfesoresPage