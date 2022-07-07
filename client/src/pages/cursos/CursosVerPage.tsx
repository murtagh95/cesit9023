

import { Box, Grid, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomLabelItem from '../../components/CustomLabelItem';
import { buscarCursoPorId } from '../../slices/cursosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const CursosVerPage: FC = () => {
  const { id } = useParams();
  const { cargando, cursoSeleccionado } = useAppSelector((state) => state.curso);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(buscarCursoPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!cursoSeleccionado) {
    return <div>Curso no econtrado</div>;
  }

  return (
    <Box>
      <Typography variant="h3">Visualizando Curso</Typography>
      <Box padding={2}>
        <Link to="/cursos">Volver</Link>
      </Box>

      <Grid container spacing={2} color={blue}>
        <CustomLabelItem label="Año" value={cursoSeleccionado.anio} />
        <CustomLabelItem label="Cantidad Alumnos" value={cursoSeleccionado.cantidadAlumnos} />
        <CustomLabelItem label="Carrera" value={cursoSeleccionado.carrera} />
        <CustomLabelItem label="Bedelia" value={cursoSeleccionado.bedelia} />
      </Grid>

    </Box>
  );
};

export default CursosVerPage;
