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
  Stack,
  Pagination
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box } from '@mui/system';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  buscarMaterias,
  eliminarMateriaPorId,
  limpiarMaterias,
  setCriterio
} from '../../slices/materiasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BusquedaGadget from '../../components/form/BusquedaGadget';
import { DropdownOption } from '../../components/form/MyDropdown';


const MateriaPage = () => {
  const dispatch = useAppDispatch();
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const materiaId = useRef<string>();
  const { cargando, materias, mensajeError, skip, limit, cantidadPaginas } = useAppSelector(
    (state) => state.materia
  );
  const optionesBusqueda: DropdownOption[] = [
    { label: 'Nombre', value: 'nombre' },
    { label: 'Profesor', value: 'profesor' },
    { label: 'Todo', value: 'busqueda' }
  ]

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(buscarMaterias());

    return () => {
      if (!window.location.pathname.startsWith('/materias')) {
        dispatch(limpiarMaterias());
      }
    };
  }, []);


  const handlePaginationOnChange = (ev: ChangeEvent<unknown>, skip: number) => {
    dispatch(buscarMaterias({ skip, limit }));
  }

  return (
    <Box>
      <Typography variant="h3">Listando Materias</Typography>
      <br />
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate('/materias/nuevo')}
        fullWidth
      >
        Nueva Materia
      </Button>

      <BusquedaGadget
        setCriterio={
          (criterio: Record<string, string> | null) => dispatch(setCriterio(criterio))
        }
        realizarBusqueda={
          () => dispatch(buscarMaterias())
        }
        options={optionesBusqueda}
      />


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
          <>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Profesor</TableCell>
                    <TableCell align="right">Duracion</TableCell>
                    <TableCell align="right">Condicion Materia</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materias.map((materia) => (
                    <TableRow
                      key={materia._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {materia.nombre}
                      </TableCell>
                      <TableCell align="right">{materia.profesor}</TableCell>
                      <TableCell align="right">{materia.duracion}</TableCell>
                      <TableCell align="right">{materia.condicionMateria}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => navigate(`/materias/${materia._id}/ver`)} ><VisibilityIcon /></Button>

                        <Button onClick={() => navigate(`/materias/${materia._id}/editar`)}><CreateIcon /></Button >

                        <MuiLink
                          onClick={() => {
                            materiaId.current = materia._id;
                            setMostrarDialogo(true);
                          }}
                        >
                          <Button><DeleteIcon /></Button>
                        </MuiLink>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack spacing={2} width="100%" alignItems="center">
              <Pagination
                count={cantidadPaginas}
                page={skip} siblingCount={2}
                onChange={handlePaginationOnChange}
                variant="outlined"
                color="primary"
              />
            </Stack>
          </>
        )
      )}

      <Dialog
        open={mostrarDialogo}
        onClose={() => setMostrarDialogo(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Eliminar materia?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está seguro que desea eliminar el materia seleccionado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogo(false)}>No</Button>
          <Button
            onClick={() => {
              dispatch(eliminarMateriaPorId(materiaId.current || ''));
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

export default MateriaPage;
