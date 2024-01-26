'use client'

import { useAutocomplete } from "@/hooks/useAutocomplete";
import { Controller } from "react-hook-form";
import { Autocomplete } from "@mui/material";
import { useEffect } from "react";

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
export default function AutocompleteCustom({ resetField, getValues, customValue, watch, url, inputLabel, optionLabels, name, dataField = 'id', control, error, helperText, freeSolo, disabled, filteredBy, filteredByValues }) {
  const watchInputFIltered = filteredBy ? watch(filteredBy) : null;
  let disabledByInput = filteredBy ? true : false;
  let prevValue = getValues(name)

  const autocompleteProps = useAutocomplete({ 
    url,
    inputLabel,
    optionLabels,
    error,
    helperText,
    dataField,
    freeSolo,
    filteredBy,
    filteredByValues,
    disabled: watchInputFIltered ? disabled : disabledByInput,
    watchInputFIltered,
  });

  useEffect(() => {
    const haveAllValues = !watchInputFIltered ? false : watchInputFIltered.every(inputValue => {
      return inputValue != null
        && inputValue != undefined
        && inputValue != "Fecha inválida"
        && JSON.stringify(inputValue) != "{}" 
    });
    disabledByInput = !haveAllValues;

    /* @TODO: replantear el tema del reseteo del autocomplete dependiendo de las dependencias */
  }, [watchInputFIltered]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
        <Autocomplete
          sx={{ mt: 1 }}
          disabled={disabled}
          disableClearable={disabled}
          readOnly={disabled}
          {...autocompleteProps}
          {...{
            ...field,
            freeSolo,
            onChange: (_, data) => {
              if (!freeSolo) {
                field.onChange(data || {});
              } else {
                if (data?.id) {
                  field.onChange(!!data[customValue] ? {...data, id: data[customValue]} : data);
                } else {
                  field.onChange(data ? {
                    id: data,
                    descripcion: data
                  } : {});
                }
              }
            },
            onInputChange: (_, data) => {
              if (freeSolo) {
                field.onChange(data ? {
                  [dataField]: data,
                  descripcion: data
                } : {});
              }
            },
            onBlur: (e) => {
              field.onBlur(e);

              if (freeSolo && !field.value?.id) {
                const data = e.target.value;
                
                field.onChange(data ? {
                  [dataField]: data,
                  descripcion: data
                } : {});
              }
            }
          }}
        />
      )}}
    />
  )
}
