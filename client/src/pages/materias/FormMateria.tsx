import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface IFormInputs {
    nombre: string;
    profesor: string;
    duracion: string;
    condicionMateria: string;

}

const schemaValidator = yup
    .object({
        nombre: yup.string().required('El nombre es requerido'),
        profesor: yup.string().required('El profesor es requerido'),
        duracion: yup.number().required('La duracion es requerida'),
        condicionMateria: yup.string().required('El campo condicion final de la materia es requerido')
    })
    .required();

interface FormMateriaProps {
    data?: IFormInputs;
    onSubmit: (data: IFormInputs) => void;
}

const FormMaterias: FC<FormMateriaProps> = ({ data, onSubmit }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({
        defaultValues: data || {},
        resolver: yupResolver(schemaValidator),
    });

    const navigate = useNavigate();

    const options = [
        { value: "regular", label: "Regular" },
        { value: "promocion", label: "Promoción" }

    ];

    const duracion = [
        { value: 12, label: "Anual" },
        { value: 6, label: "Semestral" }
    ];

    return (
        <Grid>
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
                            error={Boolean(errors.nombre)}
                            helperText={errors.nombre ? errors.nombre.message : ''}
                        />
                    )}
                />

                <br />
                <br />

                <Controller
                    name="profesor"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            multiline
                            label="Profesor"
                            placeholder="Ingrese el nombre del profesor aquí..."
                            fullWidth
                            error={Boolean(errors.profesor)}
                            helperText={errors.profesor ? errors.profesor.message : ''}
                        />
                    )}
                />

                <br />
                <br />

                <Controller
                    name="duracion"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            multiline
                            label="Duracion"
                            select
                            onChange={onChange}
                            value={value}
                            placeholder="Ingrese la duracion aquí..."
                            fullWidth
                            error={Boolean(errors.duracion)}
                            helperText={errors.duracion ? errors.duracion.message : ''}
                        >
                            {duracion.map((duraciones) => (
                                <MenuItem key={duraciones.value} value={duraciones.value}>
                                    {duraciones.label}
                                </MenuItem>
                            ))}

                        </TextField>
                    )}

                />

                <br />
                <br />

                <Controller
                    name="condicionMateria"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Condicion de la Materia"
                            select
                            onChange={onChange}
                            value={value}
                            placeholder="Ingrese la condicion de la materia aquí..."
                            fullWidth
                            error={Boolean(errors.condicionMateria)}
                            helperText={errors.condicionMateria ? errors.condicionMateria.message : ''}

                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}

                        </TextField>

                    )}
                />

                <br />
                <br />

                <Stack direction="row" spacing={1}>
                    <Button
                        type="submit"
                        value="Guardar"
                        variant="contained"
                    >
                        Guardar
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => navigate('/materias')}
                    >
                        Cancelar
                    </Button>
                </Stack>
            </form>
        </Grid>
    );
};

export default FormMaterias;
