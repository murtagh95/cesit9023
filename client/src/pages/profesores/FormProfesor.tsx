import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface IFormInputs {
  nombre: string;
  apellido: string;
  dni: number;
  edad: number;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    dni: yup.number().required('El número de DNI es requerido'),
    edad: yup.number().required('La edad es requerida'),
  })
  .required();

interface FormProfesorProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}

const FormProfesor: FC<FormProfesorProps> = ({ data, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: data || {},
    resolver: yupResolver(schemaValidator),
  });

  return (
    <Grid>
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
          name='dni'
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Número de DNI'
              placeholder='Ingrese el número de DNI aquí...'
              fullWidth
              error={Boolean(errors.dni)}
              helperText={errors.dni ? errors.dni.message : ''}
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
        <input type='submit' value="GUARDAR" />
        <Link to="/profesores">Cancelar</Link>
      </form>
    </Grid>
  );
};

export default FormProfesor;
