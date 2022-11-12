import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";
import "../styles/datepicker.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>CCSIT-RIES</title>
        <meta charSet="utf-8" />
      </Head>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            paddingBlock: "1rem",
            paddingInline: "1rem",
          },
        }}
      />

      <NextNProgress options={{ showSpinner: false }} />
      <SessionProvider
        session={session}
        refetchOnWindowFocus={false}
        refetchInterval={30 * 60}
      >
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />

            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
