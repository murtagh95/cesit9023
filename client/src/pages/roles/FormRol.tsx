import { Grid, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInputText from '../../components/form/MyInputText';
import MyTextArea from '../../components/form/MyTextArea';
import MyRadioButton, {
  RadioButtonOption,
} from '../../components/form/MyRadioButton';

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
  const navigate = useNavigate();
  const { control, setValue, handleSubmit } = useForm<IFormInputs>({
    defaultValues: data || {},
    resolver: yupResolver(schemaValidator),
  });

  const options: RadioButtonOption[] = [
    { label: 'Hombre', value: 'hombre' },
    { label: 'Mujer', value: 'mujer' },
    { label: 'Otro', value: 'otro' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyRadioButton
            name="genero"
            control={control}
            label="Género"
            options={options}
          />
        </Grid>
        <Grid item xs={12}>
          <MyInputText name="nombre" control={control} label="Nombre" />
        </Grid>
        <Grid item xs={12}>
          <MyTextArea name="descripcion" control={control} label="Descripcion" />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
            <Button
              variant="outlined"
              value="Cancelar"
              onClick={() => navigate(`/roles`)}
            >
              Cancelar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
export default FormRol;
