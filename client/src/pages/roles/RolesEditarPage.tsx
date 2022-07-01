import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarRolService } from '../../services/roles-services';
import { buscarRolPorId } from '../../slices/rolesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FormRol, { IFormInputs } from './FormRol';

const RolesEditarPage = () => {
  const { id } = useParams();
  const { cargando, rolSeleccionado } = useAppSelector((state) => state.rol);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(buscarRolPorId(id));
  }, [id, dispatch]);

  if (cargando) {
    return <div>Loading...</div>;
  }
  if (!rolSeleccionado) {
    return <div>Rol no encontrado</div>;
  }

  const actualizandoRol = async (data: IFormInputs) => {
    try {
      if (!id) return;
      await actualizarRolService(id, data);
      navigate('/roles');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Editar Rol</Typography>
      <FormRol data={rolSeleccionado} onSubmit={actualizandoRol} />
    </Box>
  );
};

export default RolesEditarPage;