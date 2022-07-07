import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { buscarTareas } from '../../../slices/tareasSlice';
import { useAppDispatch } from '../../../store/hooks';

export interface IFromBuscar {
  tipo: string;
  busqueda: string;
}

const BuscarTareas = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFromBuscar>({
    defaultValues: {
      tipo: '_todos',
    },
  });

  const onSubmit = (data: IFromBuscar) => {
    dispatch(buscarTareas({ criterio: `${data.tipo}=${data.busqueda}` }));
  };

  return (
    <Box padding={2}>
      <Typography>Buscar por</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="tipo"
          render={({ field: { onChange, value } }) => (
            <Select onChange={onChange} value={value || ' '}>
              <MenuItem value="nombre">Nombre</MenuItem>
              <MenuItem value="descripcion">Descripción</MenuItem>
              <MenuItem value="_todos">Todos</MenuItem>
            </Select>
          )}
        />

        <Controller
          name="busqueda"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              placeholder="Ingrese el nombre aquí..."
              error={Boolean(errors.busqueda)}
              helperText={errors.busqueda ? errors.busqueda.message : ''}
            />
          )}
        />
        <Button type="submit" variant="outlined">
          Buscar
        </Button>
      </form>
    </Box>
  );
};

export default BuscarTareas;
