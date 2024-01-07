import { ApiClient } from "@/utils/apiClient";
import { CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export function useAutocomplete({ inputLabel, url, optionLabels, error, helperText, dataField, freeSolo }) {
  const apiClient = new ApiClient({ url });

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

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
    setOpen(true);
  };
  
  const onClose = () => {
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