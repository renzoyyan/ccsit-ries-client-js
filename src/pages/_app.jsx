import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/context/AuthContext";
import ConfirmProvider from "@/context/ConfirmContext";
import ConfirmModal from "@/components/elements/modal/ConfirmModal";
import "../styles/globals.css";
import "../styles/datepicker.css";
import UserProvider from "@/context/UserContext";
import { SocketProvider } from "@/context/SocketContext";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 3 }, // refetch every 5mins
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
          duration: 5000,
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
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SocketProvider>
              <ConfirmProvider>
                <Component {...pageProps} />
                <ConfirmModal />
              </ConfirmProvider>
            </SocketProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
