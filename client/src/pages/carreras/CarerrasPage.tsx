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
  DialogActions,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { buscarCarrera, limpiarCarrera, eliminarCarreraPorId } from '../../slices/carrerasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Visibility } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Edit } from '@material-ui/icons';
import { red } from '@mui/material/colors';


const CarerrasPage = () => {

  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const carreraId = useRef<string>();
  const { cargando, carreras, mensajeError } = useAppSelector(state => state.carrera);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarCarrera());

    return () => {
      if (!window.location.pathname.startsWith("/carreras")) {
        dispatch(limpiarCarrera());
      }
    }
  }, []);

  return (
    <Box>
      <Typography variant='h3'>Listando Carreras</Typography>
      <Button variant="contained" size="small" onClick={() => navigate("/carrera/nueva")}>Nuevo Carrera</Button>

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
                  <TableCell align="right">duracion</TableCell>
                  <TableCell align="right">horario</TableCell>
                  <TableCell align="right">plan</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {carreras.map(carrera => {
                  return (
                    <TableRow
                      key={carrera._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {carrera.nombre}
                      </TableCell>
                      <TableCell align="right">{carrera.duracion}</TableCell>
                      <TableCell align="right">{carrera.horario}</TableCell>
                      <TableCell align="right">{carrera.plan}</TableCell>

                      <TableCell align="right">
                        <IconButton color='primary' arial-label="visibility" onClick={() => navigate(`/carreras/${carrera._id}/ver`)}>
                          <Visibility />
                        </IconButton>

                        <IconButton color='warning' arial-label="edit" onClick={() => navigate(`/carreras/${carrera._id}/editar`)}>
                          <Edit />
                        </IconButton>
                        {/* <EditIcon color='primary' arial-label="edit" onClick={() => navigate(`/carreras/${carrera._id}/editar`)} /> */}

                        <IconButton aria-label="delete " color='error'
                          onClick={() => {
                            carreraId.current = carrera._id;
                            setMostrarDialogo(true);
                          }}>
                          <DeleteIcon />
                        </IconButton>

                      </TableCell>
                    </TableRow>
                  );
                })}

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
        <DialogTitle id="alert-dialog-title">{'Eliminando tarea?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está seguro que desea eliminar la carrera seleccionada.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogo(false)}>No</Button>
          <Button
            onClick={() => {
              dispatch(eliminarCarreraPorId(carreraId.current || ''));
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

export default CarerrasPage