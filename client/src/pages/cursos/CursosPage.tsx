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
  Link as MuiLink,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { buscarCurso, eliminarCursoPorId, limpiarCurso } from '../../slices/cursosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Icon } from '@material-ui/core';
import { Visibility } from '@mui/icons-material';
import { Edit } from '@material-ui/icons';
import DeleteIcon from '@mui/icons-material/Delete';

const CursosPage = () => {

  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const cursoId = useRef<string>();
  const { cargando, cursos, mensajeError } = useAppSelector(state => state.curso);


  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarCurso());

    return () => {
      if (!window.location.pathname.startsWith("/cursos")) {
        dispatch(limpiarCurso());
      }
    }
  }, []);

  return (
    <Box>
      <Typography variant='h3'>Listando Cursos</Typography>
      <Button variant="contained" size="small" onClick={() => navigate("/curso/nuevo")}>Nuevo Curso</Button>

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
                  <TableCell>Año</TableCell>
                  <TableCell align="right">Cantidad Alumnos</TableCell>
                  <TableCell align="right">Carrera</TableCell>
                  <TableCell align="right">Bedelia</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {cursos.map(curso => (
                  <TableRow
                    key={curso._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {curso.anio}
                    </TableCell>
                    <TableCell align="right">{curso.cantidadAlumnos}</TableCell>
                    <TableCell align="right">{curso.carrera}</TableCell>
                    <TableCell align="right">{curso.bedelia}</TableCell>
                    <TableCell align="right">
                      <IconButton color='primary' arial-label="visibility" onClick={() => navigate(`/cursos/${curso._id}/ver`)}>
                        <Visibility />
                      </IconButton>

                      <IconButton color='warning' arial-label="edit" onClick={() => navigate(`/cursos/${curso._id}/editar`)}>
                        <Edit />
                      </IconButton>
                      {/* <Link to={`/cursos/${curso._id}/editar`}>Editar</Link> */}

                      <IconButton aria-label="delete " color='error'
                        onClick={() => {
                          cursoId.current = curso._id;
                          setMostrarDialogo(true);
                        }}>
                        <DeleteIcon />
                      </IconButton>

                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        )}
      <Dialog
        open={mostrarDialogo}
        onClose={() => setMostrarDialogo(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Eliminando Curso?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está seguro que desea eliminar el curso seleccionado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogo(false)}>No</Button>
          <Button
            onClick={() => {
              dispatch(eliminarCursoPorId(cursoId.current || ''));
              setMostrarDialogo(false);
            }}
            autoFocus
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CursosPage