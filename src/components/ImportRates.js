import { Button } from "@mui/material";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export default function ImportRates({ onImportData = () => {} }) {
  const readExcelFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Puedes acceder a las hojas de trabajo y datos aquí
      const firstSheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName.trim()], {
        raw: false, // Importante para obtener celdas como objetos con formato
        blankrows: false, // Evita filas vacías
      });

      // Limpiar espacios en blanco alrededor de los valores
      const cleanedData = sheetData.map((row) => {
        const cleanedRow = {};
        Object.keys(row).forEach((key) => {
          let cleanedValue = typeof row[key] === 'string' ? row[key].trim() : row[key];
  
          // Convertir VCLIENTE y VPROVEEDOR a números si corresponden
          if (
            key.trim().toUpperCase() === 'VCLIENTE' 
            || key.trim().toUpperCase() === 'VPROVEEDOR'
            || key.trim().toUpperCase() === 'VCLIENTE AYUDANTE'
            || key.trim().toUpperCase() === 'VPROVEEDOR AYUDANTE'
          ) {
            cleanedValue = parseFloat(cleanedValue.replace(/[^\d.-]/g, ''));
          }
  
          cleanedRow[key.trim().toUpperCase()] = cleanedValue;
        });
        return cleanedRow;
      });

      if (cleanedData) {
        resolve(cleanedData);
      } else {
        reject();
      }
    };

    reader.readAsArrayBuffer(file);
  });

  const readCsvFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;
      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          Swal.fire({
            text: 'Error al parsear el archivo CSV:' + error.message,
            icon: 'error'
          });
          reject();
        },
      });
    };

    reader.readAsText(file);
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    let data;

    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();

      if (extension === 'xlsx' || extension === 'xls') {
        data = await readExcelFile(file);
      } else if (extension === 'csv') {
        data = await readCsvFile(file);
      } else {
        Swal.fire({
          text: 'Formato de archivo no compatible. Se admiten archivos XLSX, XLS y CSV.',
          icon: 'info'
        });
      }

      if (data) {
        onImportData(data);
      } else {
        Swal.fire({
          text: 'No se pudieron leer los datos del archivo correctamente',
          icon: 'error'
        });
      }
    }

    event.target.value = '';
  }

  return (
    <>
      <input 
        type='file' 
        id='importar-tarifarios' 
        onChange={handleFileChange}
        style={{ display: 'none' }} 
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv" 
      />
      <a 
        href={'/files/plantilla-tarifario.xlsx'}
        id='descargar-plantilla'
        style={{ display: 'none' }}
        download
      />
      <Button
        sx={{ marginBottom: '.5em', alignSelf: { xs: 'initial', md: 'center' }}}
        variant='contained'
        color="info"
        onClick={() => document.getElementById('descargar-plantilla').click()}
      >
        Descargar Plantilla
      </Button>
      <Button
        sx={{ alignSelf: { xs: 'initial', md: 'center' }}} 
        variant='contained'
        onClick={() => document.getElementById('importar-tarifarios').click()}
      >
        Importar Tarifarios
      </Button>
    </>
  )
}
