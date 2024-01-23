'use client'

import { Box, Button, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { API } from "@/utils/constants";
import { useFormCustom } from "@/hooks/useFormCustom";
import Permissions from "@/components/Permisssions";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";

export default function Crear() {
  const [ permisos, setPermisos ] = useState(false);
  const [ permisosStatus, setPermisosStatus ] = useState(false);
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
    }
  ];

  const customSubmit = (formdata) => {
    const apiClient = new ApiClient({ url: API.USUARIOS });

    apiClient.post({
      data: { 
        correo: formdata.correo,
        permisos: JSON.stringify(permisosStatus)
      },
      onSuccess
    });
  };

  const { Form } = useFormCustom({ 
    url: API.USUARIOS,
    customSubmit,
    onSuccess,
    fields,
  });

  useEffect(() => {
    const apiClient = new ApiClient({ url: API.USUARIOS + '-roles-permisos' });
    apiClient.getAll({ 
      onSuccess: result => {
        const mappedRolesPermisos = result?.data?.reduce((acc, rolPermiso) => {
          acc[rolPermiso.rol] = { ...acc[rolPermiso.rol], [rolPermiso.id]: rolPermiso.habilitado };
          return acc;
        }, {});

        const mappedPermisos = result?.data?.reduce((acc, rolPermiso) => {
          acc[rolPermiso.id] = false;
          return acc;
        }, {});
    
        setRolesPermisos(mappedRolesPermisos);
        setPermisosStatus(mappedPermisos);
        setPermisos(result?.data);
        setPermisosKey(Math.random());
      }
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        Crear Usuario
      </Typography>
      <Stack alignItems={'center'}>
        <Form>
          {!!permisos && !!rolesPermisos && <Permissions 
            keySelect={permisosKey}
            permisos={permisos} 
            permisosStatus={permisosStatus} 
            setPermisos={setPermisosStatus} 
            rolesPermisos={rolesPermisos}
          />}
          <Button variant="contained" fullWidth sx={{ marginTop: 3 }} type="submit">Crear Usuario</Button>
        </Form>
      </Stack>
    </Box>
  )
}