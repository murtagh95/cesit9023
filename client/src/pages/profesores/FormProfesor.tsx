import { Box, Grid, Input, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import { crearProfesorService } from '../../services/profesores-services';

interface IFormInputs {
  nombre: string;
  apellido: string;
  legajo: number;
  edad: number;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    legajo: yup.string().required('El número de legajo es requerido'),
    edad: yup.string(),
  })
  .required();

const FormProfesor = () => {
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
      await crearProfesorService(data);
      navigate('/profesores');
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
          name='apellido'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Apellido'
              placeholder='Ingrese el apellido aquí...'
              fullWidth
              error={Boolean(errors.apellido)}
              helperText={errors.apellido ? errors.apellido.message : ''}
            />
          )}
        />

        <br />
        <br />

        <Controller
          name='legajo'
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Número de legajo'
              placeholder='Ingrese el número de legajo aquí...'
              fullWidth
              error={Boolean(errors.legajo)}
              helperText={errors.legajo ? errors.legajo.message : ''}
            />
          )}
        />

        <br />
        <br />


        <Controller
          name='edad'
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Edad'
              placeholder='Ingrese la edad aquí...'
              fullWidth
              error={Boolean(errors.edad)}
              helperText={errors.edad ? errors.edad.message : ''}
            />
          )}
        />

        <br />
        <input type='submit' />
      </form>
    </Grid>
  );
};

export default FormProfesor;
