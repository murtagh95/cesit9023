import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomLabelItem from '../../components/CustomLabelItem';
import { buscarRolPorId } from '../../slices/rolesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const RolesVerPage: FC = () => {
  const { id } = useParams();
  const { cargando, rolSeleccionado } = useAppSelector((state) => state.rol);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(buscarRolPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!rolSeleccionado) {
    return <div>Rol no encontrado</div>;
  }

  return (
    <Box>
      <Typography variant="h3">Visualizando Rol</Typography>
      <Box padding={2}>
        <Link to="/roles">Volver</Link>
      </Box>

      <Grid container spacing={2}>
        <CustomLabelItem label="Nombre" value={rolSeleccionado.nombre} />
        <CustomLabelItem label="Descripcion" value={rolSeleccionado.descripcion} />
      </Grid>
    </Box>
  );
};
export default RolesVerPage;