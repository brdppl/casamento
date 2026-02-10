import EventDetails from '@/components/wedding/EventDetails';
import Footer from '@/components/wedding/Footer';
import GiftList from '@/components/wedding/GiftList';
import Hero from '@/components/wedding/Hero';
import Navbar from '@/components/wedding/Navbar';
import OurStory from '@/components/wedding/OurStory';
import RSVPForm from '@/components/wedding/RSVPForm';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { asPath } = router;

  return (
    <>
      <Head>
        <title>Casamento Isa & Be</title>
        <meta
          name="description"
          content="Isa e Be se unem para celebrar o amor, a história e os sonhos que constroem juntos. Um casamento pensado em cada detalhe para viver e compartilhar esse dia único."
        />
        <meta property="og:title" content="Casamento Isa & Be" />
        <meta
          property="og:description"
          content="Isa e Be se unem para celebrar o amor, a história e os sonhos que constroem juntos. Um casamento pensado em cada detalhe para viver e compartilhar esse dia único."
        />
        <meta
          property="og:url"
          content={`https://casamentoisaebe.com.br${asPath}`}
        />
        <meta
          property="og:image"
          content="https://casamentoisaebe.com.br/images/monograma.png"
        />
        <meta name="twitter:title" content="Casamento Isa & Be" />
        <meta
          name="twitter:description"
          content="Isa e Be se unem para celebrar o amor, a história e os sonhos que constroem juntos. Um casamento pensado em cada detalhe para viver e compartilhar esse dia único."
        />
        <meta
          name="twitter:image"
          content="https://casamentoisaebe.com.br/images/monograma.png"
        />
      </Head>
      <div className="min-h-screen bg-background">
        {/* <Navbar /> */}
        <Hero />
        <OurStory />
        <EventDetails />
        <RSVPForm />
        <GiftList />
        {/* <Footer /> */}
      </div>
    </>
  );
}
