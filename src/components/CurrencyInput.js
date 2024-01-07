import { TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      decimalScale={2}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
      prefix="$"
      thousandSeparator=" "
    />
  );
});

const CurrencyInput = ({
  name, 
  control, 
  label,
  error, 
  helperText
}) => {
  const [values, setValues] = useState({
    numberformat: '',
  });
  const [ key, setKey ] = useState(Math.random());

  const handleChange = (event) => {
    setValues({
      numberformat: event.target.value,
    });
  };

  return <Controller
    name={name}
    control={control}
    render={({ field }) => <TextField
      {...field}
      fullWidth
      variant='outlined'
      key={key}
      helperText={helperText}
      error={error}
      label={label}
      autoComplete="off"
      onChange={e => {
        handleChange(e);
        field.onChange(e.target.value);
      }}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumericFormatCustom,
      }}
      sx={{ mt: 1 }}
    />}
  />
};

export default CurrencyInput;