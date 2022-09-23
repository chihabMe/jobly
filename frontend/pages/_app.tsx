import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "src/components/layout/Header/Header";
import Container from "src/components/layout/Container";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
