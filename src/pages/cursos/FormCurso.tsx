import { Button, ButtonGroup, Grid, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC } from 'react'
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import MyInputText from '../../components/form/MyInputText';
import MyTextArea from '../../components/form/MyTextArea';
import MyCheckbox from '../../components/form/MyCheckbox';
import MyInputDate from '../../components/form/MyInputDate';
import MyInputSlider from '../../components/form/MyInputSlider';

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
  const navigate = useNavigate();
  const {
    control,
    setValue,
    handleSubmit,
  } = useForm<IFormInputs>({
    defaultValues: data || {},
    resolver: yupResolver(schemaValidator),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyInputText name="anio" control={control} label="Año" />
        </Grid>
        <Grid item xs={12}>
          <MyInputText name="cantidadAlumnos" control={control} label="Cantidad de Alumnos" />
        </Grid>
        <Grid item xs={12}>
          <MyInputText name="carrera" control={control} label="Carrera" />
        </Grid>
        <Grid item xs={12}>
          <MyInputText name="bedelia" control={control} label="Bedelia" />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" >Guardar</Button>
            <Button
              variant="outlined"
              value="Cncelar"
              onClick={() => navigate(`/tareas`)}
            >Cancelar</Button>
          </Stack>
        </Grid>

      </Grid>
    </form>

  );
};

export default FormCurso;
