import React, { useEffect } from "react";
import { ReactQueryConfigProvider, ReactQueryCacheProvider } from "react-query";
import { AppProps } from "next/app";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";

import { getQueryCache, QueryInitialCacheItem } from "@/libs/query";
import MainLayout from "@/layout-modules/main";

export type QueryCache = Record<string, any>;

const App = ({ Component, pageProps }: AppProps) => {
  const queryInitialCache: QueryInitialCacheItem[] =
    pageProps.queryInitialCache;
  const queryCache = getQueryCache(false, queryInitialCache);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ReactQueryConfigProvider
      config={{
        suspense: typeof window !== "undefined",
      }}
    >
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Container>
              <Component {...pageProps} />
            </Container>
          </MainLayout>
        </ThemeProvider>
      </ReactQueryCacheProvider>
    </ReactQueryConfigProvider>
  );
};

const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: "Roboto Mono, monospace",
    },
    h2: {
      fontFamily: "Roboto Mono, monospace",
    },
    h3: {
      fontFamily: "Roboto Mono, monospace",
    },
    h4: {
      fontFamily: "Roboto Mono, monospace",
    },
    h5: {
      fontFamily: "Roboto Mono, monospace",
    },
    h6: {
      fontFamily: "Roboto Mono, monospace",
    },
  },
});

export default App;
