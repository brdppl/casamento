import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/styles/globals.css';
import '@/styles/App.css';
import Navbar from '@/components/wedding/Navbar';
import Footer from '@/components/wedding/Footer';
import Head from 'next/head';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="keywords" content="Casamento, Isadora, Bernardo, Amor" />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="revisit-after" content="1 day" />
        <meta name="language" content="Portuguese" />
        <meta name="generator" content="N/A" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="620" />
        <meta property="og:image:height" content="316" />
        <meta property="og:site_name" content="Casamento Isa & Be" />
        <meta name="twitter:card" content="summary" />
      </Head>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
