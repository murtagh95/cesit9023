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
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  buscarTareas,
  eliminarTareaPorId,
  limpiarTareas,
} from '../../slices/tareasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BuscarTareas from './components/BuscarTareas';
import { TableDeleteBtn, TableEditBtn, TableShowBtn } from '../../components/table/TableButtons';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { format } from 'date-fns'
import { DATE_FORMAT } from '../../utils/constants';

const TareasPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const tareaId = useRef<string>();
  const { cargando, tareas, mensajeError } = useAppSelector(
    (state) => state.tarea
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarTareas({}));

    return () => {
      if (!window.location.pathname.startsWith('/tareas')) {
        dispatch(limpiarTareas());
      }
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      
      <Typography variant="h3">Listando Tareas</Typography>
      
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate('/tareas/nueva')}
        fullWidth
      >
        Nueva Tarea
      </Button>
      
      
      <BuscarTareas />

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
                  <TableCell align="right">Finalizada</TableCell>
                  <TableCell align="right">Fecha Límite</TableCell>
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
                    <TableCell align="right">
                      {tarea.finalizada ? 'Si' : 'No'}
                    </TableCell>
                    <TableCell align="right">
                      {tarea.fechaLimite  ? format(new Date(tarea.fechaLimite), DATE_FORMAT) : ''}
                    </TableCell>
                    <TableCell align="right">
                        <TableShowBtn onClick={() => navigate(`/tareas/${tarea._id}/ver`)} />
                        <TableEditBtn onClick={() => navigate(`/tareas/${tarea._id}/editar`)} />
                        <TableDeleteBtn onClick={() => {
                          tareaId.current = tarea._id;
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
          dispatch(eliminarTareaPorId(tareaId.current || ''));
          setMostrarDialogo(false);
        }}
      />
    </Box>
  );
};

export default TareasPage;
