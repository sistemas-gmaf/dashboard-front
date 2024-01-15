import { TextField } from "@mui/material";
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
    render={({ field: { onChange, onBlur, value } }) => <TextField 
      disabled={disabled}
      fullWidth
      variant="outlined"
      sx={{ mt: 1 }}
      inputProps={{ style: { textTransform: "uppercase" } }}
      InputLabelProps={{ shrink: true }}
      type="date"
      helperText={helperText}
      error={error}
      label={label}
      onBlur={onBlur}
      value={moment(value, 'YYYYMMDD').format('YYYY-MM-DD')}
      onChange={e => {
        onChange(moment(e.target.value).format('YYYYMMDD'));
      }}
    />}
  />
};

export default DateInput;