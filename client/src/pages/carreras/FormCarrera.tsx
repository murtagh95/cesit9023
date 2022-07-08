import { Button, ButtonGroup, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { crearCarreraService } from '../../services/carreras-services';

import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface IFormInputs {
  nombre: string;
  duracion: string;
  horario: string;
  plan: string;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    duracion: yup
      .string()
      .required('La duración es requerida')
      .typeError('La duración debe ser un número'),
    horario: yup.string().required('El horario es requerido'),
    plan: yup.string().required('El plan es requerido'),
  })
  .required();

interface FormCarreraProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}

const FormCarrera: FC<FormCarreraProps> = ({ data, onSubmit }) => {
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
          name="nombre"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label="Nombre"
              placeholder="Ingrese el nombre aquí..."
              fullWidth
              type="text"
              error={Boolean(errors.nombre)}
              helperText={errors.nombre ? errors.nombre.message : ''}
            />
          )}
        />

        <br />
        <br />

        <Controller
          name="duracion"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label="Duracion"
              placeholder="Ingrese la duracion aquí..."
              fullWidth
              error={Boolean(errors.duracion)}
              helperText={errors.duracion ? errors.duracion.message : ''}
            />
          )}
        />
        <br />
        <br />

        <Controller
          name="horario"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label="horario"
              placeholder="Ingrese la descripcion aquí..."
              fullWidth
              error={Boolean(errors.horario)}
              helperText={errors.horario ? errors.horario.message : ''}
            />
          )}
        />
        <br />
        <br />

        <Controller
          name="plan"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label="Plan"
              placeholder="Ingrese la duracion aquí..."
              fullWidth
              error={Boolean(errors.plan)}
              helperText={errors.plan ? errors.plan.message : ''}
            />
          )}
        />
        <br />
        <br />
        <ButtonGroup
          size="large"
          aria-label="large outlined primary button group"
          color="success"
        >
          <Button type="submit">Guardar</Button>
          <Button color="error" component={Link} to="/carreras">
            Cancelar
          </Button>
        </ButtonGroup>
      </form>
    </Grid>
  );
};

export default FormCarrera;
