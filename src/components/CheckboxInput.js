import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

export default function CheckboxInput({
  name,
  control,
  label
}) {
  return (
    <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            label={label}
            style={{ marginBottom: '1em' }}
            control={
              <Checkbox checked={value} onChange={onChange} />
            }
          />
        )}
      />
  )
}
