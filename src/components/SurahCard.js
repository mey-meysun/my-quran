import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from "react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function SurahCard({ query }) {

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [surahs, setSurahs] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
   useEffect(() => {
    const url = `https://equran.id/api/v2/surat`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.data);
		setIsLoading(false); 
      })
      .catch((err) => {
        console.log("Error Fetching Data", err);
		setIsLoading(false); 
      });
  }, []);
  
  const filteredSurahs = 
  query ? 
  surahs.filter(
  (surah) =>
    surah.namaLatin.toLowerCase().includes(query.toLowerCase()) ||
    surah.arti.toLowerCase().includes(query.toLowerCase())
  ) : surahs;

  return (
 <Box>
	<Box
  sx={{
    width: '80%',
    mt: 5, 
    mx: 'auto',
    mb: 3,
  }}
>
  <Typography
    variant="h6"
    color="text.primary"
    sx={{
      display: 'inline-block',
      borderBottom: '2px solid',
	  borderColor: 'text.primary',
      pb: 1,
	  fontWeight:'700',
	  letterSpacing : '1px'
    }}
  >
    Surat
  </Typography>
</Box>

    <Box
      sx={{
        width: '80%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
        gap: 3,
        margin: '0 auto',
		mb: 3
      }}
    >
	
	{!isLoading && filteredSurahs.length === 0 && (
	  <Typography sx={{ gridColumn: '1 / -1', textAlign: 'center', mt: 5, color: 'text.primary' }}>
		Surat tidak ditemukan.
	  </Typography>
	)}
	
	{isLoading && (
	  <Typography sx={{ gridColumn: '1 / -1', textAlign: 'center', mt: 5, color: 'text.primary' }}>
		Loading...
	  </Typography>
	)}
	
      {filteredSurahs.map((surah, index) => (
        <Card  sx={{
			borderRadius: 3,
			elevation: 3,
			transition: "0.3s",
			'&:hover': {
			transform: 'scale(1.02)',
			boxShadow: 3,
			}
		}} key={surah.nomor}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
			component={RouterLink}
			to={`/surah/${surah.nomor}`}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: '#eaeaea',
                '&:hover': {
                  backgroundColor: '#eaeaea',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
			 <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent:"space-between" }}>
			 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                {surah.nomor}
              </Box>
             <Box>
			  <Typography variant="body1" component="div" sx={{fontWeight: 900}}>
                {surah.namaLatin} <span style={{fontWeight: 500, fontSize:"15px"}}>({surah.arti})</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
               {surah.tempatTurun} <span style={{fontSize:"8px", color:"grey", display:"inline"}}>●</span> {surah.jumlahAyat} Ayat
              </Typography>
			 </Box>
			 </Box>
			 <Typography variant="h6" component="div">
                {surah.nama}
              </Typography>
			  </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
	</Box>
  );
}