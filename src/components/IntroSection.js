import React from "react";
import { Typography, Box } from "@mui/material";

export default function IntroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url('/bg-quran.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: { xs: "80vh", md: "50vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
		mt: 5
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.7)", 
          zIndex: 1,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2, pt: 5, mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
          Assalamu'alaikum, <span style={{backgroundColor: "green", display:"inline-block", color:"white"}}> Hamba Allah! </span>
        </Typography>

        <Typography variant="subtitle1" fontStyle="italic" color="white">
          "Sesungguhnya Al-Quran ini memberi petunjuk kepada (jalan) yang lebih lurus..."
        </Typography>

        <Typography variant="caption" display="block" color="white">
          – QS. Al-Isra: 9
        </Typography>
      </Box>
    </Box>
  );
}
