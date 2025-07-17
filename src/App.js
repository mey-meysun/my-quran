import Home from "./pages/Home";
import About from "./pages/About";
import SurahDetail from "./pages/SurahDetail";
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./App.css";

function App() {
 const [query, setQuery] = useState("");
 const [darkMode, setDarkMode] = useState(false);
 const theme = createTheme({
  palette: {
    mode: darkMode ? "dark" : "light",
    primary: {
      main: "#66bb6a", 
    },
    background: {
      default: darkMode ? "#121212" : "#fafafa",
      paper: darkMode ? "#1e1e1e" : "#ffffff"
    },
    text: {
      primary: darkMode ? "#ffffff" : "#2e7d32",
      secondary: darkMode ? "#cccccc" : "#555555"
    }
  },
  typography: {
    fontFamily: "Poppins"
  }
});

  return (
   <ThemeProvider theme={theme}>
    <Box sx={{bgcolor: 'background.default', fontFamily: 'Poppins' }}>
	<Router>
		<Header onSearch={setQuery} toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
			<Routes>
				<Route path="/" element={<Home query={query} />} />
				<Route path="/tentang" element={<About />} />
				<Route path="/surah/:id" element={<SurahDetail />} />
			</Routes>
		<Footer />
	</Router>
    </Box>
   </ThemeProvider>
  );
}

export default App;
