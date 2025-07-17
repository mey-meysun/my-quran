import React from "react";
import { Box, Container, Typography, Link, Grid, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(to right, #2e7d32, #66bb6a)",
        color: "white",
        py: 6,
        px: 2,
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Box sx={{display: "flex", alignItems: "center"}}>
		 <RouterLink to="/">
          <img src="/logo-for-dark.png" alt="logo" style={{width: "50px"}} />
		 </RouterLink>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            sx={{
              mr: 2,
              display: { xs: "block", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
			  mt: 1
            }}
          >
            MyQuran
          </Typography>
		  </Box>
            <Typography variant="body2" sx={{ maxWidth: 400, lineHeight: 1.8, fontFamily:"monospace" }}>
              Baca, dengar, dan resapi.
            </Typography>
			 <Typography variant="body2" sx={{ maxWidth: 500, lineHeight: 1.8, fontFamily:"monospace" }}>
			  <strong>MyQuran</strong> hadir menuntun langkahmu, dari dunia menuju surga-Nya. 
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Jelajahi
            </Typography>
            {["/", "/tentang"].map((path,i) => (
              <Link
                key={path}
                to={path}
				component={RouterLink}
                underline="hover"
                variant="body2"
                color="inherit"
                sx={{
                  display: "block",
                  my: 0.5,
				  fontFamily:"monospace",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#d0f0c0",
                    pl: 1,
                  },
                }}
              >
			  {["Beranda", "Tentang"][i]}
              </Link>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} <strong>MyQuran</strong> — Dibuat oleh <span style={{ fontWeight: "bold" }}>Mey.</span>
        </Typography>
      </Container>
    </Box>
  );
}
