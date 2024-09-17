import "styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "styles/theme";
import { Footer } from "components/atoms";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="88vh">
        <Component {...pageProps} />
      </Box>
      <Footer />
    </ChakraProvider>
  );
}
