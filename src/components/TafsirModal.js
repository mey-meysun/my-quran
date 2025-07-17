import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function TafsirModal({openTafsir, setOpenTafsir, surah, id, title, ayat}) {
 const [tafsir, setTafsir] = useState(null);
 
  useEffect(() => {
	  
	if (!openTafsir || !id ) return;
	
    const url = `https://equran.id/api/v2/tafsir/${id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTafsir(data.data.tafsir);
      })
      .catch((err) => {
        console.log("Error Fetching Data", err);
      });
  }, [openTafsir, id]);
  
  const handleCloseTafsir = () => {
    setOpenTafsir(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseTafsir}
        aria-labelledby="customized-dialog-title"
        open={openTafsir}
      >
       <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
			{title ? title : `Tafsir Surah ${surah?.namaLatin || ''}`}
	   </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleCloseTafsir}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
			  <DialogContent dividers>
		  {!tafsir ? (
			<Typography>Memuat tafsir...</Typography>
		  ) : ayat ? (
			tafsir.find((t) => t.ayat === ayat) ? (
			  <Box mb={2}>
				<Typography variant="body2" color="text.secondary">
				  {tafsir.find((t) => t.ayat === ayat).teks}
				</Typography>
			  </Box>
			) : (
			  <Typography>Tafsir tidak ditemukan.</Typography>
			)
		  ) : (
			tafsir.map((item) => (
			  <Box key={item.ayat} mb={2}>
				<Typography fontWeight="bold" gutterBottom>
				  Ayat {item.ayat}
				</Typography>
				<Typography variant="body2" color="text.secondary">
				  {item.teks}
				</Typography>
			  </Box>
			))
		  )}
		</DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleCloseTafsir}>
            Tutup
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
