import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "src/components/layout/Header/Header";
import Container from "src/components/layout/Container";
import Footer from "src/components/layout/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </Container>
  );
}

export default MyApp;
