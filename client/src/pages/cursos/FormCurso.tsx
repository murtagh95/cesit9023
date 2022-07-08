import { Button, ButtonGroup, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC } from 'react'
import { Link } from 'react-router-dom';

export interface IFormInputs {
  anio: number;
  cantidadAlumnos: number;
  carrera: string;
  bedelia: string;
}

const schemaValidator = yup
  .object({
    anio: yup.number().required('El año es requerido').typeError("El año debe ser un número"),
    cantidadAlumnos: yup.number().required('La Cantidad de Alumnos es Requerida').typeError("La cantidad debe ser un número"),
    carrera: yup.string().required('La carrera es requerido'),
    bedelia: yup.string().required('El nombre de la Bedel es requerido'),

  })
  .required();


interface FormCursoProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}


const FormCurso: FC<FormCursoProps> = ({ data, onSubmit }) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: data || {},
    resolver: yupResolver(schemaValidator),
  });
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

        <ButtonGroup size="large" aria-label="large outlined primary button group" color="success">
          <Button type="submit">Guardar</Button>
          <Button color="error" component={Link} to="/cursos">Cancelar</Button>
        </ButtonGroup>

      </form>
    </Grid>
  );
};

export default FormCurso;
