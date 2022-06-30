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
import { Link, useNavigate } from 'react-router-dom'
import {
  buscarProfesores,
  eliminarProfesorPorId,
  limpiarProfesores
} from '../../slices/profesoresSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const ProfesoresPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const profesorId = useRef<string>();
  const { cargando, profesores, mensajeError } = useAppSelector(
    (state) => state.profesor
  );

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
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate("/profesores/nuevo")}
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
                  <TableCell align="right">Apellido</TableCell>
                  <TableCell align="right">DNI</TableCell>
                  <TableCell align="right">Edad</TableCell>
                  <TableCell align="right">Acciones</TableCell>
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
                    <TableCell align="right">{profesor.dni}</TableCell>
                    <TableCell align="right">{profesor.edad}</TableCell>
                    <TableCell align="right">
                      <Link to={`/profesores/${profesor._id}/ver`}>Ver</Link>
                      {` `}
                      <Link to={`/profesores/${profesor._id}/editar`}>Editar</Link>
                      {` `}
                      <MuiLink
                        onClick={() => {
                          profesorId.current = profesor._id;
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
        <DialogTitle id="alert-dialog-title">{'Eliminando profesor?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está seguro que desea eliminar el profesor seleccionada.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogo(false)}>No</Button>
          <Button
            onClick={() => {
              dispatch(eliminarProfesorPorId(profesorId.current || ''));
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


export default ProfesoresPage