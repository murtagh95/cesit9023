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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Materia {
  _id: string;
  nombre: string;
  profesor: string;
  duracion: string;
  condicionMateria: string;
}
export const MateriaPage = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    buscarMateriasHandler();
  }, []);

  useEffect(() => {
    console.info('-- Iniciando la página');
  }, []);

  const buscarMateriasHandler = async () => {
    try {
      const res = await axios.get<Materia[]>(
        'http://localhost:5005/api/materias'
      );
      setMaterias(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box>
      <Typography variant="h3">Listando Materias</Typography>
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
              <TableCell align="right">Profesor</TableCell>
              <TableCell align="right">Duracion</TableCell>
              <TableCell align="right">Condicion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materias.map((materia) => (
              <TableRow
                key={materia.nombre}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {materia.nombre}
                </TableCell>
                <TableCell align="right">{materia.profesor}</TableCell>
                <TableCell align="right">{materia.duracion}</TableCell>
                <TableCell align="right">{materia.condicionMateria}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
