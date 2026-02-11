import { motion } from 'framer-motion';
import {
  Hotel,
  Home,
  MapPin,
  Shirt,
  Clock,
  CheckCircle,
  AlertTriangle,
  PartyPopper,
  Car,
  Lightbulb,
  ExternalLink,
  CircleAlert,
} from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

const hotels = [
  {
    name: 'Novotel Porto Alegre Tres Figueiras',
    description:
      '4 estrelas, a 12 min do local da cerimônia. Restaurante, piscina e café da manhã incluso.',
    distance: '5 km do evento',
    price: 'A partir de R$ 450/noite',
    map: 'https://maps.app.goo.gl/w4TkKWAr5dSx7NSh6',
  },
  {
    name: 'Holiday Inn Porto Alegre',
    description:
      '3 estrelas, a 8 min do local da cerimônia. Restaurante, academia e café da manhã incluso.',
    distance: '5 km do evento',
    price: 'A partir de R$ 400/noite',
    map: 'https://maps.app.goo.gl/xLXCYkEr9ewdryxKA',
  },
  {
    name: 'Hotel Laghetto Stilo Higienópolis',
    description:
      '4 estrelas, a 7 min do local da cerimônia. Restaurante, bar, piscina, e café da manhã incluso.',
    distance: '2,6 km do evento',
    price: 'A partir de R$ 500/noite',
    map: 'https://maps.app.goo.gl/bSMi1gXPNY7q5XFr5',
  },
  {
    name: 'ibis Styles Porto Alegre Moinhos de Vento',
    description:
      '3 estrelas, a 8 min do local da cerimônia. Restaurante, bar e academia.',
    distance: '3,6 km do evento',
    price: 'A partir de R$ 280/noite',
    map: 'https://maps.app.goo.gl/xLXCYkEr9ewdryxKA',
  },
];

const neighboorhoods = [
  {
    name: 'Higienópolis',
    description:
      'Bairro tranquilo e residencial, com boa localização, fácil acesso à Av. Assis Brasil e opções de comércio e restaurantes próximos.',
  },
  {
    name: 'Auxiliadora',
    description:
      'Charmoso e bem localizado, com cafés, restaurantes e serviços, ideal para quem busca conforto e praticidade durante a estadia.',
  },
  {
    name: 'Boa Vista',
    description:
      'Área nobre e arborizada, conhecida pela tranquilidade, ruas elegantes e sensação de exclusividade.',
  },
  {
    name: 'Três Figueiras',
    description:
      'Sofisticado e silencioso, com grandes áreas verdes, perfeito para quem prefere um ambiente mais reservado e residencial.',
  },
  {
    name: 'Mont Serrat',
    description:
      'Moderno e bem estruturado, combina vida urbana, boa gastronomia e fácil deslocamento para outras regiões da cidade.',
  },
  {
    name: 'Moinhos de Vento',
    description:
      'Um dos bairros mais tradicionais e charmosos de Porto Alegre, com ótimos restaurantes, parques e uma atmosfera vibrante.',
  },
];

const tips = [
  {
    icon: Shirt,
    title: 'Dress Code: Passeio Completo',
    description:
      'Elegância é a palavra-chave! Homens: terno ou blazer com calça social. Mulheres: vestido midi ou longo, conjuntos elegantes.',
    highlight: true,
  },
  {
    icon: AlertTriangle,
    title: 'Cores a Evitar',
    description:
      'Por favor, evite branco, off-white, creme e azul marinho — essas cores são reservadas para os noivos e padrinhos.',
    highlight: true,
  },
  {
    icon: CheckCircle,
    title: 'Confirme sua Presença',
    description:
      'Confirme pelo nosso site até 30 dias antes do casamento para nos ajudar com o planejamento.',
  },
  {
    icon: Clock,
    title: 'Pontualidade',
    description:
      'A cerimônia começa às 19h em ponto. Chegue com pelo menos 30 minutos de antecedência para se acomodar.',
  },
  {
    icon: Car,
    title: 'Deslocamento',
    description:
      'Se for beber prefira usar apps de transporte — a região tem boa cobertura.',
  },
  {
    icon: PartyPopper,
    title: 'A Festa',
    description:
      'Após a cerimônia, a recepção acontece no mesmo local. Prepare-se para dançar muito e celebrar conosco até tarde!',
  },
];

const SectionTitle = ({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) => (
  <motion.div {...fadeUp} className="text-center mb-12">
    <h2 className="font-script text-7xl text-foreground mb-4">{children}</h2>
    {subtitle && (
      <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-accent mb-12">
        {subtitle}
      </p>
    )}
  </motion.div>
);

const Dicas = () => {
  return (
    <>
      <Head>
        <title>Dicas · Casamento Isa & Be</title>
        <meta name="description" content="Algumas dicas para o grande dia" />
        <meta property="og:title" content="Dicas · Casamento Isa & Be" />
        <meta
          property="og:description"
          content="Algumas dicas para o grande dia"
        />
        <meta
          property="og:url"
          content={typeof window !== 'undefined' ? window.location.href : ''}
        />
        <meta
          property="og:image"
          content="https://casamentoisaebe.com.br/images/monograma.png"
        />
        <meta name="twitter:title" content="Dicas · Casamento Isa & Be" />
        <meta
          name="twitter:description"
          content="Algumas dicas para o grande dia"
        />
        <meta
          name="twitter:image"
          content="https://casamentoisaebe.com.br/images/monograma.png"
        />
      </Head>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-secondary/30 pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <Lightbulb className="w-7 h-7 text-accent" />
              </div>
              <h1 className="font-script text-7xl md:text-8xl text-foreground mb-4">
                Guia do Convidado
              </h1>
              <p className="font-sans-elegant text-sm md:text-base text-accent max-w-lg mx-auto leading-relaxed">
                Preparamos este guia com tudo que você precisa saber para
                aproveitar ao máximo a nossa celebração
              </p>
            </motion.div>
          </div>
        </div>

        {/* Dicas para a Cerimônia */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <SectionTitle subtitle="O que você precisa saber">
              Dicas Importantes
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-5">
              {tips.map((tip, i) => (
                <motion.div
                  key={tip.title}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`border rounded-sm p-6 ${
                    tip.highlight
                      ? 'bg-accent/5 border-accent/30'
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        tip.highlight ? 'bg-accent/15' : 'bg-accent/10'
                      }`}
                    >
                      <tip.icon
                        className={`w-5 h-5 ${tip.highlight ? 'text-accent' : 'text-accent'}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {tip.title}
                      </h3>
                      <p className="font-sans-elegant text-sm text-foreground/70 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hotéis */}
        <section className="py-24 px-6 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <SectionTitle subtitle="Onde se hospedar">
              Hotéis Recomendados
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-5">
              {hotels.map((hotel, i) => (
                <motion.div
                  key={hotel.name}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-sm p-6 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {hotel.name}
                  </h3>
                  <p className="font-sans-elegant text-sm text-foreground/70 leading-relaxed mb-4 flex-1">
                    {hotel.description}
                  </p>
                  <Link
                    href={hotel.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-sans-elegant text-sm underline underline-offset-4 transition-colors mb-3"
                  >
                    Ver no mapa
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <div className="space-y-1 font-sans-elegant text-xs text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-accent" />
                      {hotel.distance}
                    </div>
                    <p className="font-semibold text-foreground/80">
                      {hotel.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Airbnb / Bairros */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <SectionTitle subtitle="Para quem prefere Airbnb">
              Melhores Bairros
            </SectionTitle>
            <div className="grid md:grid-cols-3 gap-5">
              {neighboorhoods.map((neighboorhood, i) => (
                <motion.div
                  key={neighboorhood.name}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-sm p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {neighboorhood.name}
                  </h3>
                  <p className="font-sans-elegant text-sm text-foreground/70 leading-relaxed">
                    {neighboorhood.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dicas;
