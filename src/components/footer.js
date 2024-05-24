import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Abo Hasan Restaurant
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CssBaseline />

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Link
              href="/signin"
              color="inherit"
              sx={{
                mb: 5,
              }}
            >
              Owner
            </Link>
            <Typography sx={{ mt: 2 }} variant="body1">
              Authentic Lebanese Taste
            </Typography>

            <Link
              href="https://maps.app.goo.gl/NsipfTu3ahphmKyC9"
              target="_blank"
              sx={{ mt: 2 }}
            >
              Location Link
            </Link>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Phone: 71234969 / 01741725
            </Typography>
            <Copyright sx={{ mt: 2 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
