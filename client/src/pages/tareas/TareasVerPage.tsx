import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomLabelItem from '../../components/CustomLabelItem';
import { buscarTareaPorId } from '../../slices/tareasSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const TareasVerPage: FC = () => {
  const { id } = useParams();
  const { cargando, tareaSeleccionada } = useAppSelector((state) => state.tarea);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(buscarTareaPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!tareaSeleccionada) {
    return <div>Tarea no econtrada</div>;
  }

  return (
    <Box>
      <Typography variant="h3">Visualizando Tarea</Typography>
      <Box padding={2}>
        <Link to="/tareas">Volver</Link>
      </Box>

      <Grid container spacing={2}>
        <CustomLabelItem label="Nombre" value={tareaSeleccionada.nombre} />
        <CustomLabelItem
          label="Descripcion"
          value={tareaSeleccionada.descripcion}
        />
      </Grid>
    </Box>
  );
};

export default TareasVerPage;
