import Head from 'next/head';

export default function GiftsPage() {
  return (
    <>
      <Head>
        <title>Lista de Presentes · Casamento Isa & Be</title>
        <meta name="description" content="Sua presença é o melhor presente" />
        <meta
          property="og:title"
          content="Lista de Presentes · Casamento Isa & Be"
        />
        <meta
          property="og:description"
          content="Sua presença é o melhor presente"
        />
        <meta
          property="og:url"
          content={typeof window !== 'undefined' ? window.location.href : ''}
        />
        <meta
          property="og:image"
          content="https://casamentoisaebe.com.br/monograma.svg"
        />
        <meta
          name="twitter:title"
          content="Lista de Presentes · Casamento Isa & Be"
        />
        <meta
          name="twitter:description"
          content="Sua presença é o melhor presente"
        />
        <meta
          name="twitter:image"
          content="https://casamentoisaebe.com.br/monograma.svg"
        />
      </Head>
      <div className="min-h-screen bg-background">
        <p>Gifts Page works!</p>
      </div>
    </>
  );
}
