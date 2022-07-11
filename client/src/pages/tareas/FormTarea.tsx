import { Button, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInputText from '../../components/form/MyInputText';
import MyTextArea from '../../components/form/MyTextArea';
import MyCheckbox from '../../components/form/MyCheckbox';

export interface IFormInputs {
  nombre: string;
  descripcion: string;
  finalizada: boolean;
}

const schemaValidator = yup
  .object({
    nombre: yup.string().required('El nombre es requerido'),
    descripcion: yup.string().required('La descripcion es requerida'),
  })
  .required();

interface FormTareaProps {
  data?: IFormInputs;
  onSubmit: (data: IFormInputs) => void;
}

const FormTarea: FC<FormTareaProps> = ({ data, onSubmit }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
  } = useForm<IFormInputs>({
    defaultValues: data || {},
    resolver: yupResolver(schemaValidator),
  });

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MyInputText name="nombre" control={control} label="Nombre" />
          </Grid>
          <Grid item xs={12}>
            <MyTextArea name="descripcion" control={control} label="Descripcion" />
          </Grid>
          <Grid item xs={12}>
          <MyCheckbox name="finalizada" control={control} label="Finalizada?" />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Button type="submit" value="Guardar" variant="contained" >Guardar</Button>
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

export default FormTarea;
