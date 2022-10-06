import {
  Alert,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,} from '@mui/material';
import { Box } from '@mui/system';
import {  useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  buscarRoles,
  eliminarRolPorId,
  limpiarRoles,
} from '../../slices/rolesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BuscarRoles from './components/BuscarRoles';
import { TableDeleteBtn, TableEditBtn, TableShowBtn } from '../../components/table/TableButtons';
import ConfirmationModal from '../../components/modals/ConfirmationModal';

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
      if (!window.location.pathname.startsWith('/roles')) {
        dispatch(limpiarRoles());
      }
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <Typography variant="h3">Listando Roles</Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate('/roles/nuevo')}
        fullWidth
      >
        Nuevo Rol
      </Button>

      <BuscarRoles />

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
                {roles.map((rol) => (
                  <TableRow
                    key={rol._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {rol.nombre}
                    </TableCell>
                    <TableCell align="right">
                      {Boolean(rol.descripcion).toString()}
                    </TableCell>
                    <TableCell align="right">
                    <TableShowBtn onClick={() => navigate(`/roles/${rol._id}/ver`)} />
                          <TableEditBtn onClick={() => navigate(`/roles/${rol._id}/editar`)} />
                          <TableDeleteBtn onClick={() => {
                            rolId.current = rol._id;
                            setMostrarDialogo(true);
                          }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}

      <ConfirmationModal
        open={mostrarDialogo}
        message="Está seguro que desea eliminar la tarea seleccionada."
        onClose={() => setMostrarDialogo(false)}
        onNo={() => setMostrarDialogo(false)}
        onYes={() => {
          dispatch(eliminarRolPorId(rolId.current || ''));
          setMostrarDialogo(false);
        }}
      />
    </Box>
  );
};

export default RolesPage;