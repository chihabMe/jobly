import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "src/components/layout/Container";
import { Provider } from "react-redux";
import { store } from "src/store";
import { AuthContextProvider } from "src/context/AuthContext";
import NextNProgress from "nextjs-progressbar";
import Header from "src/components/layout/Header/Header";
import { ThemeProvider } from "@material-tailwind/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { NextPageContext } from "next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <NextNProgress color="#2563EB"/>
      <NextThemeProvider attribute="class">
        <Container>
          <ThemeProvider>
            <Header />
            <Component {...pageProps} />
          </ThemeProvider>
        </Container>
      </NextThemeProvider>
    </Provider>
  );
}

export default MyApp;
