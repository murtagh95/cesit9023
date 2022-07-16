import { Box, Grid, LinearProgress, Typography } from '@mui/material';
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
    return <LinearProgress />;
  }
  if (!tareaSeleccionada) {
    return <div>Tarea no econtrada</div>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={2}>
      <Typography variant="h3">Visualizando Tarea</Typography>
      
      <Link to="/tareas">Volver</Link>
      
      <Grid container spacing={2}>
        <CustomLabelItem label="Nombre" value={tareaSeleccionada.nombre} />
        <CustomLabelItem
          label="Descripcion"
          value={tareaSeleccionada.descripcion}
        />
        <CustomLabelItem
          label="Finalizada"
          value={tareaSeleccionada.finalizada ? 'true' : 'false'}
        />
      </Grid>
    </Box>
  );
};

export default TareasVerPage;
