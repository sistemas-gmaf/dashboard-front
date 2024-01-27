import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState } from "react";
import PDFViewer from "./PDFViewer";
import Swal from "sweetalert2";

export default function DocVisualize({ url, type, title }) {
  const [ openModal, setOpenModal ] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleDownload = async () => {
    const userConfirm = await Swal.fire({
      title: `¿Desea descargar el archivo de ${title}?`,
      icon: 'info',
      confirmButtonText: 'Descargar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    });

    if (!userConfirm.isConfirmed) { return; }

    const link = document.createElement("a");
    link.download = title;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <Typography variant="h5" textAlign={'center'}>
        {
          url && <>
            {title}:
            <IconButton onClick={() => setOpenModal(true)}>
              <PreviewIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => handleDownload()}>
              <FileDownloadIcon fontSize="large" />
            </IconButton>
          </>
        }
      </Typography>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="Previsualización de documento"
        aria-describedby="Previsualización de documento"
        sx={{
          zIndex: 5000
        }}
      >
        <DialogContent>
          {
            type?.includes('pdf')
            ? <PDFViewer
                pdfUrl={url}
                width={500}
                height={500}
              />
            : <img
                src={url}
                width={500}
                height={500}
                style={{
                  objectFit: 'contain'
                }}
              />
          }          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
