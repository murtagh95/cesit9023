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
    Alert
  } from '@mui/material';
  import { Box } from '@mui/system';
  import { useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom'
import { buscarCarrera, limpiarCarrera } from '../../slices/carrerasSlice';
  import { useAppDispatch, useAppSelector } from '../../store/hooks';
  
  const CarerrasPage = () => {
  
    const dispatch = useAppDispatch();
    const { cargando, carreras, mensajeError } = useAppSelector(state => state.carrera);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      dispatch(buscarCarrera());
  
      return () => {
        if(!window.location.pathname.startsWith("/carreras")){
          dispatch(limpiarCarrera());
        }
      }
    }, []);
  
    return (
      <Box>
        <Typography variant='h3'>Listando Carreras</Typography>
        <Button variant="contained" size="small" onClick={()=> navigate("/carrera/nueva")}>Nuevo Carrera</Button>
        
        {mensajeError && <Box marginTop={2}>
          <Alert severity="error" color="error">
            {mensajeError}
          </Alert>
        </Box>}
  
        { cargando ? 
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
              </TableRow>
            </TableHead>
            <TableBody>
  
              {carreras.map(carrera => (
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
                    
                  <Button variant="contained" size="small" onClick={()=> navigate(`/carreras/${carrera._id}/ver`)}>ver</Button>

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
  
  export default CarerrasPage