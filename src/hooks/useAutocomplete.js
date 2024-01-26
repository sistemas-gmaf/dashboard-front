import { ApiClient } from "@/utils/apiClient";
import { CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export function useAutocomplete({ inputLabel, url, watchInputFIltered, filteredByValues, filteredBy, optionLabels, error, helperText, dataField, freeSolo, disabled }) {
  
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const params = !watchInputFIltered ? false : watchInputFIltered.map((value, idx) => {
      return typeof value == 'object' ? value[filteredByValues[idx]] : value;
    })

    if (Array.isArray(params) && params?.some(param => 
      param == null
      || param == undefined
      || param == "Fecha inválida"
      || JSON.stringify(param) == "{}")
    ) {
      setOpen(false);
      return;
    }

    const urlWithParams = params 
      ? `${url}?${filteredBy.map((filter, index) => `${filter}=${encodeURIComponent(params[index])}`).join('&')}`
      : url;

    const apiClient = new ApiClient({ url: urlWithParams });

    apiClient.getAll({
      backdrop: false,
      onSuccess: ({data}) => {
        if (active) {
          setOptions(data);
        }
      }
    });

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  
  const renderInput = (params) => {
    return (
      <TextField
        disabled={disabled}
        {...params}
        error={error}
        helperText={helperText}
        label={inputLabel}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    )
  };
  
  //const open = open;
  const onOpen = () => {
    if (disabled) { return; }
    setOpen(true);
  };
  
  const onClose = () => {
    if (disabled) { return; }
    setOpen(false);
  };

  const isOptionEqualToValue = (option, value) => {
    if (!freeSolo) {
      return option[dataField] === value[dataField];
    } else {
      return true;
    }
  }

  const getOptionLabel = option => {
    return optionLabels
      .map(optionProp => option[optionProp])
      .join(' - ');
  };

  return {
    renderInput,
    open,
    onOpen,
    onClose,
    isOptionEqualToValue,
    getOptionLabel,
    options,
    loading
  };
}