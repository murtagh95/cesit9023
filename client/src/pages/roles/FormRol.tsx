import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface IFormInputs {
  nombre: string;
  descripcion: string;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    descripcion: yup.string().required('La descripción es requerida'),
  })
  .required();

interface FormRolProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}

const FormRol: FC<FormRolProps> = ({ data, onSubmit }) => {
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
          name='descripcion'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label='Descripción'
              placeholder='Ingrese la descrición aquí...'
              fullWidth
              error={Boolean(errors.descripcion)}
              helperText={errors.descripcion ? errors.descripcion.message : ''}
            />
          )}
        />

        <br />
        <input type='submit' value="GUARDAR" />
        <Link to="/roles">Cancelar</Link>
      </form>
    </Grid>
  );
};

export default FormRol;
