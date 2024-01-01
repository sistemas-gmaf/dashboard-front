import { Box } from "@mui/material";
import { useEffect, useState } from "react"

export default function PDFViewer({ pdfUrl, width, height }) {
  const [ srcUrl, setSrcUrl ] = useState('');

  useEffect(() => {
    fetch(pdfUrl)
      .then(res => res.blob())
      .then(blob => {
        // Crea un enlace (link) para descargar el archivo
        const url = URL.createObjectURL(blob);
        setSrcUrl(url);
      });
  }, []);

  return (
    <Box
      component={'object'}
      data={srcUrl}
      width={width}
      height={height}
      type={'application/pdf'}
    >
      <p>
        {
          srcUrl !== ''
          ? 'No se pudo cargar el archivo'
          : 'Cargando...'
        }
      </p>
    </Box>
  )
}