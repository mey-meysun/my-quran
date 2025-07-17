import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DescriptionIcon from '@mui/icons-material/Description';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TafsirModal from "../components/TafsirModal";
import Pagination from '@mui/material/Pagination';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PauseIcon from "@mui/icons-material/Pause";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function SurahDetail(){
 const {id} = useParams();
 const [surah, setSurah] = useState(null);
 const [openTafsir, setOpenTafsir] = useState(false);
 const [openAyatTafsir, setOpenAyatTafsir] = useState(false);
 const [judulAyat, setJudulAyat] = useState("");
 const [noAyat, setNoAyat] = useState("");
 const [playingId, setPlayingId] = useState(null);
 const [isLoading, setIsLoading] = useState(true);
 
 const navigate = useNavigate();

	const handleOpenAyatTafsir = (ayat) => {
	  setJudulAyat(`Tafsir Ayat ${ayat.nomorAyat}`);
	  setNoAyat(ayat.nomorAyat);
	  setOpenAyatTafsir(true);
	};

    const handleClickOpenTafsir = (e) => {
		e.stopPropagation();
		setOpenTafsir(true);
	};
	
	const audioRef = useRef(null);
	const padNumber = (num) => num.toString().padStart(3, "0");

	const handlePlay = (e, nomorSurat, nomorAyat) => {
	  if (e && typeof e.stopPropagation === "function") {
		e.stopPropagation();
	  }
	  
	  const isAyat = !!nomorAyat;
	  const uniqueId = isAyat
	   ? `ayat-${nomorSurat}-${nomorAyat}`
	   : `surat-${nomorSurat}`;

	  let audioUrl = nomorAyat
	  ? `https://equran.nos.wjv-1.neo.id/audio-partial/Misyari-Rasyid-Al-Afasi/${padNumber(nomorSurat)}${padNumber(nomorAyat)}.mp3`
	  : `https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/${padNumber(nomorSurat)}.mp3`;

	  if (audioRef.current && playingId !== uniqueId) {
		audioRef.current.pause();
		audioRef.current.currentTime = 0;
	  }
	  
	  if(playingId === uniqueId){
		   audioRef.current.pause();
		   setPlayingId(false);
	   } else {
		   audioRef.current = new Audio(audioUrl)
		   audioRef.current.play();
		   setPlayingId(uniqueId);
	   }
	   
	   audioRef.current.onended = null;
	   audioRef.current.onended = () => setPlayingId(false);
	};

	
    useEffect(() => {
    setIsLoading(true);               
    fetch(`https://equran.id/api/v2/surat/${id}`)
      .then(r => r.json())
      .then(j => {
        setSurah(j.data);
        setIsLoading(false);            
      })
      .catch(e => {
        console.error(e);
        setIsLoading(false);
      });
  }, [id]);


  
	const suratSebelumnya = surah?.suratSebelumnya;
	const suratSelanjutnya = surah?.suratSelanjutnya;
	
	return(
	 <Box sx={{
		pt: 5, 
		width: {xs: "90%", md: "80%"},
        margin: '80px auto',
		mb: 3
		}}>
		
		  {(!surah || isLoading) ? (
		  <Box sx={{ textAlign: "center", py: 25 }}>
			<Typography mt={2} color={'text.primary'}>Loading…</Typography>
		  </Box>
    ) : (
      <>
		<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
		 <Typography
            variant="body2"
            noWrap
            component={RouterLink}
			to="/"
            sx={{
              fontWeight: 700,
              textDecoration: "none",
			  mt: 1,
			  display: "flex",
			  alignItems:"center",
			  gap: 1,
			  mb: 3,
			  color:"#9f9f9f"
            }}
          >
            <ArrowBackIcon sx={{fontSize: "small"}} /> Kembali
          </Typography>
			<Box
			  sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 1, 
				mb: 2
			  }}
			>
			 {suratSebelumnya && (
    <Button
      size="small"
      onClick={() => navigate(`/surah/${suratSebelumnya.nomor}`)}
      sx={{
        textTransform: "none",
        color: "#388e3c",
        backgroundColor: "#e8f5e9",
        borderRadius: "999px",
        px: { xs: 2, sm: 3 },
        py: { xs: 0.8, sm: 1 },
        fontWeight: 600,
        fontSize: { xs: "10px", sm: "12px", md: "13px" },
        display: "flex",
        alignItems: "center",
        gap: 1,
        '&:hover': {
          backgroundColor: "#c8e6c9",
        },
      }}
    >
      <ArrowBackIosIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
      {suratSebelumnya.namaLatin}
    </Button>
  )}

  {suratSebelumnya && suratSelanjutnya && (
    <Box sx={{ flex: 1 }} />
  )}

  {suratSelanjutnya && (
    <Button
      size="small"
      onClick={() => navigate(`/surah/${suratSelanjutnya.nomor}`)}
      sx={{
        textTransform: "none",
        color: "#1565c0",
        backgroundColor: "#e3f2fd",
        borderRadius: "999px",
        px: { xs: 2, sm: 3 },
        py: { xs: 0.8, sm: 1 },
        fontWeight: 600,
        fontSize: { xs: "10px", sm: "12px", md: "13px" },
        display: "flex",
        alignItems: "center",
        gap: 1,
        '&:hover': {
          backgroundColor: "#bbdefb",
        },
      }}
    >
      {suratSelanjutnya.namaLatin}
      <ArrowForwardIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
    </Button>
  )}
		</Box>

		</Box>
	<Accordion
	  sx={{
		mb: 3,
		borderRadius: 5,
		background: "linear-gradient(to right, #1eb26a, #66d18b)",
		color: "#fff", 
		boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
		'&:before': { display:'none' }
	  }}
	>
	  <AccordionSummary
		expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
		aria-controls="panel2-content"
		id="panel2-header"
	  >
		<Box
		  sx={{
			mt: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between", 
			width: "100%",
			px: 2
		  }}
		>
      <Box>
        <Typography variant="h5" fontWeight="bold" sx={{fontSize: {xs: "21px", md: "24px"}}} >
          {surah.namaLatin}
        </Typography>
        <Typography variant="body1" color="#eaeaea" mb={2} sx={{fontSize: {xs: "14px", md: "16px"}}}>
          {surah.arti}
        </Typography>
		<Grid
		  container
		  spacing={1}
		  direction={{ xs: "column", md: "row" }}
		  justifyContent="center"
		  alignItems="center"
		  mb={1}
		>
		  <Grid item xs={12} md="auto">
			<Chip
			  label={surah.tempatTurun}
			  size="small"
			  sx={{
				backgroundColor: "#388e3c",
				color: "#fff",
				px: 2,
				width: { xs: "100%", md: "auto" },
				minWidth: 100,
				textAlign: "center",
			  }}
			/>
		  </Grid>
		   <Grid item xs={12} md="auto">
			<Chip
			  label={`${surah.jumlahAyat} Ayat`}
			  size="small"
			  sx={{
				color: "#388e3c",
				px: 2,
				width: { xs: "100%", md: "auto" },
				backgroundColor: "#fffafa",
				minWidth: 100,
				textAlign: "center",
			  }}
			/>
		  </Grid>
		</Grid>

      </Box>
	  
	<Box>
	    <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#fbfbfb", mb: 3, fontSize: {xs: "30px", md: "34px"} }}
		  dir="rtl"
        >
          {surah.nama}
        </Typography>
		<Box textAlign="right" sx={{
			display: "flex",
			flexDirection: {xs: "column", md: "row"},
			alignItems: "center",
			gap: {xs: 1, md: 3},
			}}
		>
        <Button
	      onClick={handleClickOpenTafsir}
		  size="small"
          variant="contained"
          sx={{ backgroundColor: "#ffff", color: "green", textTransform:"none", fontSize: { xs: "0.7rem", md: "0.875rem" } }}
        >
		  <DescriptionIcon />
          Tafsir
        </Button> 
	
      <Button
        size="small"
        variant="contained"
        onClick={(e) => handlePlay(e, surah.nomor)}
        sx={{
          backgroundColor: "#fff",
          color: "green",
          textTransform: "none",
          fontSize: { xs: "0.7rem", md: "0.875rem" },
        }}
      >
		{playingId === `surat-${surah.nomor}` ? <PauseIcon /> : <PlayArrowIcon />}
		{playingId === `surat-${surah.nomor}` ? "Jeda" : "Putar"}
        
      </Button>
      </Box>
    </Box>
	  	<Typography variant="h6" component="div">
            {surah.nomor}
        </Typography>
    </Box>
	  </AccordionSummary>

	  <AccordionDetails sx={{bgcolor: 'background.paper', py: 3, fontStyle:"italic"}} >
	   <Typography
		  variant="body2"
		  color="text.secondary"
		  dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
		/>
	  </AccordionDetails>
	</Accordion>
	  
      {surah.ayat.map((ayat) => (
        <Card
          key={ayat.nomorAyat}
          sx={{
            mb: 3,
            borderRadius: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
            bgcolor: 'background.paper'
          }}
        >
          <CardContent>
            <Stack direction="row" alignItems="flex-start" spacing={2} sx={{py: 2}}>
              <Box
                sx={{
                  minWidth: 35,
                  height: 35,
                  backgroundColor: "#66bb6a",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {ayat.nomorAyat}
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  dir="rtl"
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: 500,
                    color: "text.primary",
                    mb: 1,
                  }}
                >
                  {ayat.teksArab}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: theme => theme.palette.grey[500], fontStyle: "italic", mb: 0.5, mt: 3 }}
                >
                  {ayat.teksLatin}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {ayat.teksIndonesia}
                </Typography>
              </Box>

             <IconButton
			   onClick={(e) => {handlePlay(e, surah.nomor, ayat.nomorAyat)}}
			   sx={{ color: "text.primary", mt: 1 }}
			>
			   {playingId === `ayat-${surah.nomor}-${ayat.nomorAyat}` ? <PauseIcon /> : <PlayArrowIcon />}
			</IconButton>
			<IconButton
			  onClick={() => handleOpenAyatTafsir(ayat)}
			  sx={{ color: "text.primary", mt: 1 }}
			>
			  <DescriptionIcon sx={{ fontSize: "16px" }} />
			</IconButton>
		</Stack>
    </CardContent>
  </Card>
))}
	  
<TafsirModal 
  openTafsir={openTafsir} 
  setOpenTafsir={setOpenTafsir} 
  surah={surah}
  id={id} 
/>

<TafsirModal
  openTafsir={openAyatTafsir}
  setOpenTafsir={setOpenAyatTafsir}
  title={judulAyat}
  ayat={noAyat}
  id={id} 
/>
</>
		  )}
</Box>

);
}