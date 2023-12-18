import { useAutocomplete } from "@/hooks/useAutocomplete";
import { Controller } from "react-hook-form";
import { Autocomplete } from "@mui/material";

/**
 * @desc Componente de input de Autocompletar
 * 
 * @param {string} url - URL tipo GET desde donde se obtiene la data para el input
 * @param {string} label - Label del input
 * @param {Array[string]} optionLabels - Como se va a mostrar cada option, cada item debe ser algun campo de objeto de lo que viene de la url
 * @param {string} name - Nombre del input
 * @param {string} dataField - Que propiedad se va a tener en cuenta para enviar en el onSubmit, por default id
 * @param {object} control - Necesario para react-hook-form
 */
export default function AutocompleteCustom({ url, inputLabel, optionLabels, name, dataField = 'id', control, error, helperText }) {
  const autocompleteProps = useAutocomplete({ 
    url,
    inputLabel,
    optionLabels,
    error,
    helperText,
    dataField
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
        <Autocomplete
          sx={{ mt: 1 }}
          {...autocompleteProps}
          {...{
            ...field,
            onChange: (_, data) => {
              if (data) {
                field.onChange(data);
              }
            }
          }}
        />
      )}}
    />
  )
}
