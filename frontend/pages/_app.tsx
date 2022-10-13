import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "src/components/layout/Container";
import { Provider } from "react-redux";
import { store } from "src/store";
import { AuthContextProvider } from "src/context/AuthContext";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </AuthContextProvider>
    </Provider>
  );
}

export default MyApp;
