'use client'

import { ApiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import Autocomplete from "@/components/Autocomplete";
import FileInput from "@/components/FileInput";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { deepClone } from "@/utils/deepClone";
import { isEqual } from "lodash";

const fieldTypeProps = {
  autocomplete: ({ url, label, name, control, optionLabels, errors }) => 
    ({
      url, inputLabel: label, name, control, optionLabels, error: Boolean(errors[name]),
      helperText: Boolean(errors[name]) ? errors[name].message : ' '
    }),
  textfield: ({ label, name, register, errors }) => 
    ({
      fullWidth: true, label, variant: "outlined", autoComplete: "off",
      sx: { mt: 1 }, inputProps: { style: { textTransform: "uppercase" } },
      error: Boolean(errors[name]), 
      helperText: Boolean(errors[name]) ? errors[name].message : ' ',
      ...register(name)
    }),
  file: ({ name, control, label, resetField, errors, defaultValues }) => 
    ({
      name, control, label, callbackReset: () => resetField(name),
      error: Boolean(errors[name]), fileToShowUrlDefault: defaultValues[name]?.url || undefined,
      fileToShowDefault: { type: defaultValues[name]?.type || undefined },
      helperText: Boolean(errors[name]) ? errors[name].message : ' '
    }),
};

const fieldTypeComponents = {
  autocomplete: Autocomplete,
  textfield: TextField,
  file: FileInput
};

const fieldsSchema = (fields = []) => {
  const mapFieldSchema = {
    autocomplete: (required = false) => {
      let fieldSchema = yup.object();
      if (required) { 
        fieldSchema = fieldSchema.required('Este campo es requerido'); 
      }
      return fieldSchema;
    },
    textfield: (required = false) => {
      let fieldSchema =yup.string();
      if (required) { fieldSchema = fieldSchema.required('Este campo es requerido'); }
      return fieldSchema;
    },
    file: (required = false) => {
      let fieldSchema = yup.mixed();
      if (required) { fieldSchema = fieldSchema.required('Este campo es requerido'); }
      return fieldSchema;
    },
  };

  const schemaShape = {};

  fields.forEach(({ name, type, required = false }) => {
    schemaShape[name] = mapFieldSchema[type](required);
  });

  return yup.object().shape(schemaShape);
}

export const useFormCustom = ({ 
  url, 
  id = false, 
  handleSubmitCustomFormdata = false,
  handleGetDefaultData = false,
  onSuccess = false,
  fields = [],
  mode = 'create'
}) => {
  const apiClient = new ApiClient({ url });
  
  const [ formKey, setFormKey ] = useState(Math.random());

  const { register, handleSubmit, control, resetField, reset, formState: { errors } } = useForm({
    resolver: yupResolver(fieldsSchema(fields)),
    reValidateMode: 'onBlur'
  });

  const resetForm = () => {
    reset();
    setFormKey(Math.random());
  }

  const onSubmit = handleSubmit(formdata => {
    let data = handleSubmitCustomFormdata ? handleSubmitCustomFormdata(formdata) : formdata;
    
    if (mode == 'edit') {
      // Lógica para verificar solo los valores que han cambiado 
      const changedValues = {};
      Object.keys(formdata).forEach((key) => {
        if (!isEqual(formdata[key], defaultValues[key])) {
          changedValues[key] = formdata[key];
        }
      });

      // Filtrar propiedades que no han cambiado
      const inputsAutocomplete = fields
        .filter(field => field.type === 'autocomplete')
        .map(field => field.name);
      data = Object.keys(changedValues).reduce((acc, key) => {
        if (inputsAutocomplete.includes(key)) {
          acc[key] = changedValues[key]?.id || undefined;
        } else {
          acc[key] = changedValues[key];
        }
        return acc;
      }, {});

      if (Object.keys(data).length === 0) {
        alert('No se realizó ningún cambio');
        return;
      }
    }

    if (mode == 'create') {
      apiClient.post({ 
        data,
        onSuccess: () => {
          /**
           * onSuccess(resetFormCallback)
           */
          if (onSuccess) {
            onSuccess(resetForm);
          } else {
            resetForm();
          }
        }
      });
    }
    if (mode == 'edit') {
      apiClient.patch({
        id,
        data,
        onSuccess
      });
    }
  });

  const [ defaultValues, setDefaultValues ] = useState({});

  useEffect(() => {
    if (mode == 'edit') {
      apiClient.get({
        id,
        onSuccess: (data) => {
          const defaultData = handleGetDefaultData ? handleGetDefaultData(data) : data;

          setDefaultValues(defaultData);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (mode == 'edit') {
      reset(deepClone(defaultValues));
      setFormKey(Math.random());
    }
  }, [defaultValues]);

  const Form = () => <Box key={formKey} component="form" onSubmit={onSubmit} sx={{ mt: 1, minWidth: { xs: '100%', md: 500 } }}>
    {/* COMPONENTES DE FORMULARIO */}
    {
      fields.map(field => {
        const Component = fieldTypeComponents[field.type];
        const props = fieldTypeProps[field.type](({ ...field, register, control, resetField, errors, defaultValues }));

        return <Component key={Math.random()} {...props} />;
      })
    }
    <Button
      fullWidth
      type="submit"
      variant="contained"
      size="large"
      sx={{ mt: 1 }}
      endIcon={mode === 'create' ? <AddIcon /> : <EditIcon />}
    >
      {mode === 'create' ? 'Crear' : 'Editar'}
    </Button>
  </Box>;

  return {
    Form
  };
}