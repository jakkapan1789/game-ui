import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "@/data/getLPTheme";
import { SnackbarProvider, useSnackbar } from "notistack";
const LPtheme = createTheme(getLPTheme("light"));

export default function App({ Component, pageProps }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={2000}
    >
      <ThemeProvider theme={LPtheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SnackbarProvider>
  );
}
