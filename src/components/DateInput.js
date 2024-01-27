import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { Controller } from "react-hook-form";

const DateInput = ({
  name, 
  control, 
  label,
  error, 
  helperText,
  disabled
}) => {
  return <Controller
    name={name}
    control={control}
    rules={{ valueAsDate: true }}
    render={({ field: { onChange, onBlur, value } }) => 
      <DatePicker
        onBlur={onBlur}
        value={value ? moment(value, 'YYYYMMDD') : null}
        onChange={value => {
          onChange(value.format('YYYYMMDD'));
        }}
        slotProps={{ textField: { 
          helperText: helperText,
          error: error,
          label: label,
          fullWidth: true,
          sx: { mt: 1 }
        } }}
      />
    }
  />
};

export default DateInput;