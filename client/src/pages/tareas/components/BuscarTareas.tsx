import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import MyDropdown, { DropdownOption } from '../../../components/form/MyDropdown';
import MyInputText from '../../../components/form/MyInputText';
import { buscarTareas } from '../../../slices/tareasSlice';
import { useAppDispatch } from '../../../store/hooks';

export interface IFromBuscar {
  tipo: string;
  busqueda: string;
}

const BuscarTareas: FC = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState,
    reset,
  } = useForm<IFromBuscar>({
    defaultValues: {
      tipo: '_todos',
    },
  });

  const onSubmit = (data: IFromBuscar) => {
    dispatch(buscarTareas({ criterio: `${data.tipo}=${data.busqueda}` }));
  };

  const limpiarBusqueda = () => {
    reset({ busqueda: ''});
    dispatch(buscarTareas());  
  }

  const options: DropdownOption[] = [
    { label: 'Nombre', value: 'nombre'},
    { label: 'Descripción', value: 'descripcion'},
    { label: 'Todo', value: '_todos'}
  ]

  return (
    <Box padding={2}>
      <Typography>Buscar por</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" gap={1}>
        <MyDropdown name='tipo' control={control} label="Buscar por" options={options} />

          <MyInputText name='busqueda' control={control} label="Criterio de busqueda" />

          <Button type="submit" variant="outlined">
            Buscar
          </Button>
          <Button onClick={limpiarBusqueda} variant="outlined" color='success'>
            X
          </Button>
        </Box>
        
      </form>
    </Box>
  );
};

export default BuscarTareas;
