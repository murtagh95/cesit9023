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
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  buscarTareas,
  eliminarTareaPorId,
  limpiarTareas,
} from '../../slices/tareasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const TareasPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const tareaId = useRef<string>();
  const { cargando, tareas, mensajeError } = useAppSelector(
    (state) => state.tarea
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarTareas());

    return () => {
      if (!window.location.pathname.startsWith('/tareas')) {
        dispatch(limpiarTareas());
      }
    };
  }, []);

  return (
    <Box>
      <Typography variant="h3">Listando Tareas</Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate('/tareas/nueva')}
      >
        Nuevo
      </Button>

      {mensajeError && (
        <Box marginTop={2}>
          <Alert severity="error" color="error">
            {mensajeError}
          </Alert>
        </Box>
      )}

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
                  <TableCell align="right">Finalizada?</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tareas.map((tarea) => (
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
                      {` `}
                      <Link to={`/tareas/${tarea._id}/editar`}>Editar</Link>
                      {` `}
                      <MuiLink
                        onClick={() => {
                          tareaId.current = tarea._id;
                          setMostrarDialogo(true);
                        }}
                      >
                        Eliminar
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
        <DialogTitle id="alert-dialog-title">{'Eliminando tarea?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está seguro que desea eliminar la tarea seleccionada.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogo(false)}>No</Button>
          <Button
            onClick={() => {
              dispatch(eliminarTareaPorId(tareaId.current || ''));
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

export default TareasPage;
