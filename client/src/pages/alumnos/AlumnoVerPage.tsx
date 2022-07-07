import { Box, Button, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomLabelItem from '../../components/CustomLabelItem';
import { buscarAlumnoPorId } from '../../slices/alumnosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const AlumnoVerPage: FC = () => {
  const { id } = useParams();
  const { cargando, alumnoSeleccionado } = useAppSelector(
    (state) => state.alumno
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(buscarAlumnoPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!alumnoSeleccionado) {
    return <div>Alumno no econtrado</div>;
  }

  return (
    <Box>
      <Typography variant="h3">Visualizando Alumno</Typography>
      <Box padding={2}>
        <Button variant="outlined" onClick={() => navigate(`/alumnos`)}>
          Volver
        </Button>
      </Box>

      <Grid container spacing={2}>
        <CustomLabelItem label="Nombre" value={alumnoSeleccionado.nombre} />
        <CustomLabelItem
          label="Descripcion"
          value={alumnoSeleccionado.apellido}
        />
        <CustomLabelItem label="DNI" value={alumnoSeleccionado.dni} />
        <CustomLabelItem
          label="Domicilio"
          value={alumnoSeleccionado.domicilio}
        />
        <CustomLabelItem
          label="Fecha de nacimiento"
          value={alumnoSeleccionado.fechaNacimiento}
        />
      </Grid>
    </Box>
  );
};

export default AlumnoVerPage;
