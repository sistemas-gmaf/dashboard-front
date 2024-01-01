import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
import { useState } from "react";
import PDFViewer from "./PDFViewer";

export default function DocVisualize({ url, type, title }) {
  const [ openModal, setOpenModal ] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
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
