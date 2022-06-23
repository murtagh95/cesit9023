import { Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { crearTareaService } from '../../services/tareas-services';
import { crearCarreraService } from '../../services/carreras-services';

interface IFormInputs {
  nombre: string;
  duracion: number;
  horario: string
  plan: string;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    duracion: yup.number().required('La duración es requerida'),
    horario: yup.string().required('el horario es requerido'),
    plan: yup.string().required('el plan es requerido'),

  })
  .required();

const FormCarrera = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ resolver: yupResolver(schemaValidator) });

  const onSubmit = async (data: IFormInputs) => {

    try {
      await crearCarreraService(data);
      navigate('/carreras');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid xs={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='nombre'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Nombre'
              placeholder='Ingrese el nombre aquí...'
              fullWidth
              error={Boolean(errors.nombre)}
              helperText={errors.nombre ? errors.nombre.message : ''}
            />
          )}
        />

        <br />
        <br />

        <Controller
          name='duracion'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Duracion'
              placeholder='Ingrese la duracion aquí...'
              fullWidth
              error={Boolean(errors.duracion)}
              helperText={errors.duracion ? errors.duracion.message : ''}
            />
          )}
        />
        <br />
        <br />

        <Controller
          name='horario'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='horario'
              placeholder='Ingrese la descripcion aquí...'
              fullWidth
              error={Boolean(errors.horario)}
              helperText={errors.horario ? errors.horario.message : ''}
            />
          )}
        />
        <br />
        <br />

        <Controller
          name='plan'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Plan'
              placeholder='Ingrese la duracion aquí...'
              fullWidth
              error={Boolean(errors.plan)}
              helperText={errors.plan ? errors.plan.message : ''}
            />
          )}
        />
        <br />
        <br />
        <Button variant="contained" size="small" type='submit'>Enviar</Button>
        
        
      </form>
    </Grid>
  );
};

export default FormCarrera;
