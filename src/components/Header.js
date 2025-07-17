import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SearchAppBar from "./Search";
import InfoIcon from "@mui/icons-material/Info";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/HomeFilled';
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function Header({ onSearch, toggleDarkMode, darkMode }) {
  const location = useLocation();
  const isAboutPage = location.pathname === "/tentang";
  const isSurahDetailPage = location.pathname.startsWith("/surah/");

  
  return (
    <AppBar position="fixed" sx={{bgcolor: 'background.default', 
	color:"text.primary", px:{ xs: 1, md: 5 }, py: 1, boxShadow: "rgba(0, 0, 0, 0.2)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Box sx={{display: "flex", alignItems: "center"}}>
		 <RouterLink to="/">
          <img src="/logo-quran.png" alt="logo" style={{width: "50px"}} />
		 </RouterLink>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
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
		  
			<Box sx={{mx: 2, maxWidth:"300px", width:"100%"}}>
		  {!isAboutPage && !isSurahDetailPage && ( 
				<SearchAppBar onSearch={onSearch}/>
		  )}
			</Box>
		  
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
		  {isAboutPage ? (
		  <>
            <Button
              component={RouterLink}
              to="/"
              sx={{ color: "inherit", fontWeight: "500", textTransform: "none", display:{xs: "none", md: "inline-flex"}}}
            >
				Beranda
            </Button>

			<IconButton color="inherit" component={RouterLink}
              to="/" sx={{display:{xs: "inline-flex", md: "none"}}}>
				<HomeIcon />
			</IconButton>
		   </>
		  ) : (
			<>
			   <Button
				  component={RouterLink}
				  to="/tentang"
				  sx={{ color: "inherit", fontWeight: "500", textTransform: "none", display:{xs: "none", md: "inline-flex"}}}
				>
					Tentang
				</Button>

				<IconButton color="inherit" component={RouterLink}
				  to="/tentang" sx={{display:{xs: "inline-flex", md: "none"}}}>
					<InfoIcon />
				</IconButton>
			</>
		  )}
            <IconButton onClick={toggleDarkMode} color={'inherit'}>
				{darkMode ? <LightModeIcon /> : <DarkModeIcon />}
			</IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
