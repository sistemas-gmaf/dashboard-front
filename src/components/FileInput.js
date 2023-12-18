'use client'

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import prettyBytes from "pretty-bytes";
import { useEffect, useRef, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import Image from "next/image";
import { isMobile } from "@/utils/mobile";

export default function FileInput({ 
  name, 
  control, 
  label, 
  callbackReset, 
  fileprops = {}, 
  error, 
  helperText, 
  fileToShowUrlDefault = false,
  fileToShowDefault = false
}) {
  const ref = useRef();
  const [ fileToShowUrl, setFileToShowUrl ] = useState(fileToShowUrlDefault || false);
  const [ fileToShow, setFileToShow ] = useState(fileToShowDefault || null);
  const [ reader, setReader ] = useState(null);
  const [ openModal, setOpenModal ] = useState(false);
  const [ keyPreview, setKeyPreview ] = useState(Math.random());
  const [ isPdf, setIsPdf ] = useState(fileToShowDefault?.type?.includes('pdf') || false);
  const [ isDefaultValue, setIsDefaultValue ] = useState(Boolean(fileToShowUrlDefault));
  
  const handleCloseModal = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    setReader(new FileReader());
  }, []);

  useEffect(() => {
    reader?.addEventListener("load", () => {
      const dataUrl = reader.result;

      setFileToShowUrl(dataUrl);
      setIsPdf(reader.result.startsWith('data:application/pdf'));
    });
  }, [reader]);

  useEffect(() => {
    setKeyPreview(Math.random());
  }, [fileToShowUrl]);

  return (
    <>
      <Box sx={{
        maxWidth: {
          xs: 'initial',
          xl: '34vw',
          
        }
      }}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              {...fileprops}
              error={error}
              helperText={helperText}
              ref={ref}
              onChange={e => {
                const { files } = e.target;
                onChange(files[0]);
                setIsDefaultValue(false);
                setFileToShow(files[0]);
                reader.readAsDataURL(files[0]);
              }}
              onBlur={onBlur}
              fullWidth
              label={label}
              type="file"
              variant="outlined"
              autoComplete="off"
              sx={{
                mt: 1,
                '& input, & input::file-selector-button': {
                  cursor: 'pointer'
                },
                '& input::file-selector-button': {
                  position: 'absolute',
                  width: '2em',
                  left: '1em',
                  border: 'none',
                  color: 'transparent',
                  backgroundColor: 'transparent'
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachFileIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ 
                    visibility: (Boolean(value) && !Boolean(isDefaultValue)) ? 'initial': 'hidden' 
                  }}>
                    <Typography variant="caption" sx={{ paddingLeft: '5px', backgroundColor: 'white', position: 'absolute', right: '3.7em' }}>
                      {Boolean(value?.size) ? prettyBytes(value?.size) : ''}
                    </Typography>
                    <Tooltip title="Quitar">
                      <IconButton onClick={() => {
                        callbackReset();
                        ref.current.querySelector('input[type="file"]').value = '';
                        setIsDefaultValue(false);
                        setFileToShowUrl(false);
                        setIsPdf(false);
                      }}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
        {fileToShowUrl && <ImageList sx={{
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(auto-fill, 150px) !important",
          gridAutoColumns: "150px",
          maxWidth: '50vw'
        }}>
          <ImageListItem>
            <Box
              key={keyPreview}
              data={fileToShowUrl}
              type={fileToShow?.type}
              width={150}
              height={150}
              component={!isDefaultValue ? 'object' : 'p'}         
            >
              {
                !isDefaultValue 
                  ? 'No es posible previsualizar el archivo' 
                  : 'No es posible mostrar miniatura'
              }
            </Box>
            {!(isMobile() && isPdf) && <ImageListItemBar
              title={'Previsualizar'}
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`Ver Detalle`}
                  title="Ver Detalle"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <PreviewIcon />
                </IconButton>
              }
            />}
          </ImageListItem>
        </ImageList>}
      </Box>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="Previsualización de documento"
        aria-describedby="Previsualización de documento"
        sx={{
          zIndex: 5000
        }}
      >
        <DialogTitle textAlign={'center'} id="prev-document">Previsualización de documento</DialogTitle>
        <DialogContent>
          <Box
            component={'embed'}
            src={fileToShowUrl}
            width={500}
            height={500}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
