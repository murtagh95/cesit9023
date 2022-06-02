import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const TareasPage = () => {



  const navigate = useNavigate();

  useEffect(() => {
    console.info("-- Iniciando la página")
  }, []);

  return (
    <Box>
      <Typography variant='h3'>Listando Tareas</Typography>
      <Button variant="contained" size="small" onClick={()=> navigate("/tareas/nueva")}>Nuevo</Button>
      
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
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Tarea 1
                </TableCell>
                <TableCell align="right">false</TableCell>
                <TableCell align="right">
                  <Link to="/tareas/2/ver">Ver</Link>
                </TableCell>
              </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TareasPage