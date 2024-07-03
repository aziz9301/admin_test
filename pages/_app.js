import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react"
import Header from "@/pages/components/Header";
import { Toaster } from "react-hot-toast";

const inter = Poppins({ subsets: ["latin"], weight: '400' });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <main className={`px-4 mx-auto max-w-8xl sm:px-6 lg:px-8 ${inter.className}`}>
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </SessionProvider>
  </main>

}
