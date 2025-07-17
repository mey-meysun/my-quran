import React from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ExtensionIcon from "@mui/icons-material/Extension";
import SourceIcon from "@mui/icons-material/Source";
import PersonIcon from "@mui/icons-material/Person";
import UpdateIcon from "@mui/icons-material/Update";

export default function Tentang() {
  return (
    <Box sx={{ pt: 5, bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 5, mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'text.primary', display: "flex", alignItems: "center", gap: 1 }}>
          <InfoIcon color="primary" /> Tentang MyQuran
        </Typography>

        <Typography variant="body1" paragraph color="text.secondary">
          <strong>MyQuran</strong> adalah aplikasi web interaktif yang membantu pengguna dalam membaca, mendengarkan, dan memahami isi Al-Qur'an.
          Aplikasi ini dibuat untuk tujuan pembelajaran dan memudahkan akses Al-Qur’an secara digital.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', display: "flex", alignItems: "center", gap: 1 }}>
          <ExtensionIcon color="primary" /> Fitur Utama
        </Typography>
		  <Box component="ul" sx={{ color: 'text.secondary', pl: 3 }}>
			  <li>
				<Typography component="span">Daftar surat lengkap dengan arti dan jumlah ayat</Typography>
			  </li>
			  <li>
				<Typography component="span">Terjemahan Bahasa Indonesia untuk setiap ayat</Typography>
			  </li>
			  <li>
				<Typography component="span">Audio tilawah</Typography>
			  </li>
			  <li>
				<Typography component="span">Tafsir ayat per ayat</Typography>
			  </li>
			  <li>
				<Typography component="span">Mode gelap/terang untuk kenyamanan</Typography>
			  </li>
		  </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" sx={{color: 'text.primary', display: "flex", alignItems: "center", gap: 1 }}>
          <SourceIcon color="primary" /> Sumber Data (API)
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Seluruh data dalam aplikasi ini bersumber dari
          <Link href="https://equran.id/apidev" target="_blank" rel="noopener" sx={{ml: '5px'}}>
            EQuran.id API v2.0
          </Link>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon color="primary" /> Pengembang
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Aplikasi ini dikembangkan oleh <strong>Mey</strong> sebagai proyek pembelajaran dalam pengembangan aplikasi React JS dan Material UI.
          Aplikasi ini bersifat <strong>non-komersial</strong> dan hanya digunakan untuk edukasi.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', display: "flex", alignItems: "center", gap: 1 }}>
          <UpdateIcon color="primary" /> Versi
        </Typography>
        <Typography variant="body2" color="text.secondary">Versi: 1.0.0</Typography>
        <Typography variant="body2" color="text.secondary">Update terakhir: Juli 2025</Typography>
      </Container>
    </Box>
  );
}
