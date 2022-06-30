import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Alumno {
  _id: string;
  nombre: string;
  apellido: string;
  dni: string;
  domicilio: string;
  fechaNacimiento: string;
}

export const AlumnoPage = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    buscarAlumnosHandler();
  }, []);

  useEffect(() => {
    console.info('-- Iniciando la página');
  }, []);

  const buscarAlumnosHandler = async () => {
    try {
      const res = await axios.get<Alumno[]>('http://localhost:5005/api/alumnos');
      setAlumnos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Listando Alumnos</Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate('/alumno/nuevo')}
      >
        Nuevo
      </Button>

      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">DNI</TableCell>
              <TableCell align="right">Direccion</TableCell>
              <TableCell align="right">Fecha de nacimiento</TableCell>
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
                <TableCell align="right">{alumno.apellido}</TableCell>
                <TableCell align="right">{alumno.dni}</TableCell>
                <TableCell align="right">{alumno.domicilio}</TableCell>
                <TableCell align="right">{alumno.fechaNacimiento}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
