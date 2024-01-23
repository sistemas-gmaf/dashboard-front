'use client'

import { Box, Button, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";
import Permissions from "@/components/Permisssions";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";

export default function Editar({ id }) {
  const [ permisos, setPermisos ] = useState(false);
  const [ rolesPermisos, setRolesPermisos ] = useState({});
  const [ permisosKey, setPermisosKey ] = useState(Math.random());

  const router = useRouter();
  
  const onSuccess = () => {
    router.push('/dashboard/usuarios');
  };

  const fields = [
    { 
      type: 'textfield', 
      label: 'Correo', 
      name: 'correo',
      required: true,
      disabled: true,
    }
  ];

  const handleGetDefaultData = (formdata) => {
    return {
      ...formdata,
      correo: formdata.usuario.correo
    };
  }

  const customSubmit = (formdata) => {
    const apiClient = new ApiClient({ url: API.USUARIOS, id });

    apiClient.patch({
      data: { 
        correo: formdata.correo,
        permisos: JSON.stringify(permisos)
      },
      onSuccess
    });
  };

  const { Form, defaultValues: dataUsuario, setDefaultValues } = useFormCustom({ 
    handleGetDefaultData,
    url: API.USUARIOS,
    customSubmit,
    mode: 'edit',
    onSuccess,
    fields,
    id,
  });

  
  useEffect(() => {
    if (!permisos) {
      const permisosMapeados = dataUsuario?.permisos?.reduce((acc, permiso) => {
        acc[permiso.id] = permiso.habilitado;
        return acc;
      }, {});
      
      setPermisos(permisosMapeados);
      dataUsuario?.usuario?.correo && setDefaultValues({ ...dataUsuario, correo: dataUsuario?.usuario?.correo });
    }
  }, [dataUsuario.permisos]);

  useEffect(() => {
    const apiClient = new ApiClient({ url: API.USUARIOS + '-roles-permisos' });
    apiClient.getAll({ 
      onSuccess: result => {
        const mappedResult = result?.data?.reduce((acc, rolPermiso) => {
          acc[rolPermiso.rol] = { ...acc[rolPermiso.rol], [rolPermiso.id]: rolPermiso.habilitado };
          return acc;
        }, {});
    
        setRolesPermisos(mappedResult);
        setPermisosKey(Math.random());
      }
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Editar Usuario
      </Typography>
      <Stack alignItems={'center'}>
        <Form>
          {!!permisos && !!rolesPermisos && <Permissions 
            keySelect={permisosKey}
            permisos={dataUsuario?.permisos || []} 
            permisosStatus={permisos} 
            setPermisos={setPermisos} 
            rolesPermisos={rolesPermisos}
          />}
          <Button variant="contained" fullWidth sx={{ marginTop: 3 }} type="submit">Editar Usuario</Button>
        </Form>
      </Stack>
    </Box>
  )
}
