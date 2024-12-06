import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "@/data/getLPTheme";
const LPtheme = createTheme(getLPTheme("light"));

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={LPtheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
