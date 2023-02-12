import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "src/components/layout/Container";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

import { store } from "src/store";
import NextNProgress from "nextjs-progressbar";
import Header from "src/components/layout/Header/Header";
import { ThemeProvider } from "@material-tailwind/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { NextPageContext } from "next";

import { apiSlice } from "../src/store/api/apiSlice";
import { ReactNode } from "react";
type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<{ children: ReactNode }>;
    hideHeader?: boolean;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <NextNProgress color="#2563EB" />
        <NextThemeProvider attribute="class">
          <Container>
            <ThemeProvider>
              {Component.hideHeader ? null : <Header />}
              {Component.PageLayout ? (
                <Component.PageLayout>
                  <Component {...pageProps} />
                </Component.PageLayout>
              ) : (
                <Component {...pageProps} />
              )}
            </ThemeProvider>
          </Container>
        </NextThemeProvider>
      </Provider>
    </ApiProvider>
  );
}

export default MyApp;
