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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  buscarAlumnos,
  eliminarAlumnoPorId,
  limpiarAlumnos,
} from '../../slices/alumnosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const AlumnoPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const alumnoId = useRef<string>();
  const { cargando, alumnos, mensajeError } = useAppSelector(
    (state) => state.alumno
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarAlumnos());

    return () => {
      if (!window.location.pathname.startsWith('/alumnos')) {
        dispatch(limpiarAlumnos());
      }
    };
  }, []);

  return (
    <Box>
      <Typography variant="h3">Listando Alumnos</Typography>
      <br />
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate('/alumno/nuevo')}
      >
        Nuevo
      </Button>
      <br />

      {mensajeError && (
        <Box marginTop={2}>
          <Alert severity="error" color="error">
            {mensajeError}
          </Alert>
        </Box>
      )}
      <br />
      {cargando ? (
        <Box marginTop={2}>
          <LinearProgress color="secondary" />
        </Box>
      ) : (
        !mensajeError && (
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Apellido</TableCell>
                  <TableCell align="center">DNI</TableCell>
                  <TableCell align="center">Direccion</TableCell>
                  <TableCell align="center">Fecha de nacimiento</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alumnos.map((alumno) => (
                  <TableRow
                    key={alumno._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {alumno.nombre}
                    </TableCell>
                    <TableCell align="center">{alumno.apellido}</TableCell>
                    <TableCell align="center">{alumno.dni}</TableCell>
                    <TableCell align="center">{alumno.domicilio}</TableCell>
                    <TableCell align="center">
                      {alumno.fechaNacimiento}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="inherit"
                        onClick={() => navigate(`/alumno/${alumno._id}/ver`)}
                      >
                        <VisibilityIcon />
                      </Button>

                      <Button
                        color="success"
                        onClick={() => navigate(`/alumno/${alumno._id}/editar`)}
                      >
                        <CreateIcon />
                      </Button>

                      <MuiLink
                        onClick={() => {
                          alumnoId.current = alumno._id;
                          setMostrarDialogo(true);
                        }}
                      >
                        <Button color="error">
                          <DeleteIcon />
                        </Button>
                      </MuiLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}

      <Dialog
        open={mostrarDialogo}
        onClose={() => setMostrarDialogo(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Eliminar alumno?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está seguro que desea eliminar el alumno seleccionado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogo(false)}>No</Button>
          <Button
            onClick={() => {
              dispatch(eliminarAlumnoPorId(alumnoId.current || ''));
              setMostrarDialogo(false);
            }}
            autoFocus
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlumnoPage;
