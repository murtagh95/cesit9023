import { Box, Grid, Input, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import { crearTareaService } from '../../services/tareas-services';

interface IFormInputs {
  nombre: string;
  descripcion: string;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    descripcion: yup.string().required('La descripcion es requerido'),
  })
  .required();

const FormTarea = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schemaValidator),
  });

  const onSubmit = async (data: IFormInputs) => {
    console.info('--- valores del formulario', data);
    try {
      await crearTareaService(data);
      navigate('/tareas');
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
          name='descripcion'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Descripcion'
              placeholder='Ingrese la descripcion aquí...'
              fullWidth
              error={Boolean(errors.descripcion)}
              helperText={errors.descripcion ? errors.descripcion.message : ''}
            />
          )}
        />
        {errors.descripcion && <p>{errors.descripcion.message}</p>}
        <br />
        <input type='submit' />
      </form>
    </Grid>
  );
};

export default FormTarea;
