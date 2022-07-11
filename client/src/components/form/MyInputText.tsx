import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputProps from './InputProps';

const MyInputText = ({ name, control, label }: InputProps) => {
    return (
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <TextField
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              label={label}
              variant="outlined"
            />
          )}
        />
      );
}

export default MyInputText