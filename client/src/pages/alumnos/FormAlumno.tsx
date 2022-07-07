import { Button, Grid, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { FC, useState } from 'react';

export interface IFormInputs {
  nombre: string;
  apellido: string;
  dni: string;
  domicilio: string;
  fechaNacimiento: string;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    dni: yup.number().required('El dni es requerido'),
    domicilio: yup.string().required('El domicilio es requerido'),
    fechaNacimiento: yup.date().required('La fecha de nacimiento es requerida'),
  })
  .required();

interface FormTareaProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}

const FormAlumno: FC<FormTareaProps> = ({ data, onSubmit }) => {
  // const [value, setValue] = useState<Date | null>(null);
  
  const navigate = useNavigate();
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
        <br />
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
              error={Boolean(errors.nombre)}
              helperText={errors.nombre ? errors.nombre.message : ''}
            />
          )}
        />

        <br />
        <br />

        <Controller
          name="apellido"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label="Apellido"
              placeholder="Ingrese el apellido aquí..."
              fullWidth
              error={Boolean(errors.apellido)}
              helperText={errors.apellido ? errors.apellido.message : ''}
            />
          )}
        />
        <br />
        <br />

        <Controller
          name="dni"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label="DNI"
              placeholder="Ingrese el apellido aquí..."
              fullWidth
              error={Boolean(errors.dni)}
              helperText={errors.dni ? errors.dni.message : ''}
            />
          )}
        />
        <br />
        <br />

        <Controller
          name="domicilio"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label="Domicilio"
              placeholder="Ingrese el domicilio aquí..."
              fullWidth
              error={Boolean(errors.domicilio)}
              helperText={errors.domicilio ? errors.domicilio.message : ''}
            />
          )}
        />
        <br />
        <br />
        
        {/* calendario */}
        <Controller 
          name="fechaNacimiento"
          control={control}
          render={({ field }) => (
            <TextField
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              {...field}
              label="Fecha de nacimiento"
              placeholder="Ingrese fecha de nacimiento"
              error={Boolean(errors.fechaNacimiento)}
              helperText={
                errors.fechaNacimiento ? errors.fechaNacimiento.message : ''
              }
            />
          )}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider> */}

        <br />
        <br />
        <Stack direction="row" spacing={1}>
          <Button type="submit" value="Guardar" variant="contained">
            Guardar
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate(`/alumnos`)}
          >
            Cancelar
          </Button>
        </Stack>
      </form>
    </Grid>
  );
};

export default FormAlumno;
