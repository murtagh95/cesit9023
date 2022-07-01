import { Box, Typography } from '@mui/material';
import { crearRolService } from '../../services/roles-services';
import FormRol, { IFormInputs } from './FormRol';
import { useNavigate } from 'react-router-dom';

const RolesNuevoPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: IFormInputs) => {
    try {
      await crearRolService(data);
      navigate('/roles');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Nuevo Rol</Typography>
      <FormRol onSubmit={onSubmit} />
    </Box>
  );
};

export default RolesNuevoPage;