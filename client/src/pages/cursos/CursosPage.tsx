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
  import { buscarCurso, limpiarCurso } from '../../slices/cursosSlice';
  import { useAppDispatch, useAppSelector } from '../../store/hooks';
  
  const CursosPage = () => {
  
    const dispatch = useAppDispatch();
    const { cargando, cursos, mensajeError } = useAppSelector(state => state.curso);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      dispatch(buscarCurso());
  
      return () => {
        if(!window.location.pathname.startsWith("/cursos")){
          dispatch(limpiarCurso());
        }
      }
    }, []);
  
    return (
      <Box>
        <Typography variant='h3'>Listando Cursos</Typography>
        <Button variant="contained" size="small" onClick={()=> navigate("/curso/nuevo")}>Nuevo</Button>
        
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
                <TableCell>Año</TableCell>
                <TableCell align="right">Cantidad Alumnos</TableCell>
                <TableCell align="right">Carrera</TableCell>
                <TableCell align="right">Bedelia</TableCell>
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
                    <Link to={`/carreras/${curso._id}/ver`}>Ver</Link>
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
  
  export default CursosPage