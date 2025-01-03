import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "@/data/getLPTheme";
import { LoadingProvider } from "@/context/providers";

const LPtheme = createTheme(getLPTheme("light"));

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <ThemeProvider theme={LPtheme}>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </ThemeProvider>
  );
}
