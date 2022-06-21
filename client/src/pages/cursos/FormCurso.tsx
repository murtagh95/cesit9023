import { Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { crearCursoService } from '../../services/cursos-services';

interface IFormInputs {
    anio: number;
    cantidadAlumnos: number;
    carrera: string;
    bedelia: string; 
}

const schemaValidator = yup
  .object({
    anio: yup.number().required('El año es requerido'),
    cantidadAlumnos: yup.number().required('La Cantidad de Alumnos es Requerida'),
    carrera: yup.string().required('la carrera es requerido'),
    bedelia: yup.string().required('el nombre de la Bedel es requerido'),

  })
  .required();

const FormCurso = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ resolver: yupResolver(schemaValidator) });

  const onSubmit = async (data: IFormInputs) => {

    try {
      await crearCursoService(data);
      navigate('/cursos');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid xs={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='anio'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Año'
              placeholder='Ingrese el Año aquí...'
              fullWidth
              error={Boolean(errors.anio)}
              helperText={errors.anio ? errors.anio.message : ''}
            />
          )}
        />

        <br />
        <br />

        <Controller
          name='cantidadAlumnos'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Cantidad de Alumnos'
              placeholder='Ingrese la cantidad de alumnos aquí...'
              fullWidth
              error={Boolean(errors.cantidadAlumnos)}
              helperText={errors.cantidadAlumnos ? errors.cantidadAlumnos.message : ''}
            />
          )}
        />
        <br />
        <br />

        <Controller
          name='carrera'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Carrera'
              placeholder='Ingrese la carrera aquí...'
              fullWidth
              error={Boolean(errors.carrera)}
              helperText={errors.carrera ? errors.carrera.message : ''}
            />
          )}
        />
        <br />
        <br />

        <Controller
          name='bedelia'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='bedelia'
              placeholder='Ingrese la bedelia aquí...'
              fullWidth
              error={Boolean(errors.bedelia)}
              helperText={errors.bedelia ? errors.bedelia.message : ''}
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

export default FormCurso;
