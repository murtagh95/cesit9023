import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { DATE_FORMAT } from "../../utils/constants";
import InputProps from "./InputProps";

const MyInputDate: FC<InputProps> = ({ name, control, label }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({ field, ...props }) => {
              return (
                <KeyboardDatePicker
                  value={field.value}
                  fullWidth
                  onChange={(date) => {
                    field.onChange(date || new Date());
                  }}
                  inputVariant="outlined"
                  autoOk
                  format={DATE_FORMAT}
                  label={label}
                  size="small"
                />
              );
            }}
          />
    </MuiPickersUtilsProvider>
  );
};

export default MyInputDate;