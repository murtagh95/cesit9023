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
  buscarRoles,
  eliminarRolPorId,
  limpiarRoles
} from '../../slices/rolesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const RolesPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const rolId = useRef<string>();
  const { cargando, roles, mensajeError } = useAppSelector(
    (state) => state.rol
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarRoles());

    return () => {
      if (!window.location.pathname.startsWith("/roles")) {
        dispatch(limpiarRoles());
      }
    }
  }, []);

  return (
    <Box>
      <Typography variant='h3'>Listando Roles</Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate("/roles/nuevo")}
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
                  <TableCell align="right">Descripción</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {roles.map(rol => (
                  <TableRow
                    key={rol._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {rol.nombre}
                    </TableCell>
                    <TableCell align="right">{rol.descripcion}</TableCell>
                    <TableCell align="right">
                      <Link to={`/roles/${rol._id}/ver`}>Ver</Link>
                      {` `}
                      <Link to={`/roles/${rol._id}/editar`}>Editar</Link>
                      {` `}
                      <MuiLink
                        onClick={() => {
                          rolId.current = rol._id;
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
        <DialogTitle id="alert-dialog-title">{'Eliminando rol?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está seguro que desea eliminar el rol seleccionada.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogo(false)}>No</Button>
          <Button
            onClick={() => {
              dispatch(eliminarRolPorId(rolId.current || ''));
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


export default RolesPage