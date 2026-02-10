import { motion } from 'framer-motion';
import { MapPin, Clock, Shirt } from 'lucide-react';
import Image from 'next/image';

const DetailCard = ({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.8, delay }}
    className="bg-card bg-[url('/asset3.png')] bg-no-repeat bg-cover bg-center border border-border rounded-sm p-8 text-center"
  >
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-5">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
    <div className="text-foreground/70 font-sans-elegant text-sm leading-relaxed space-y-1">
      {children}
    </div>
  </motion.div>
);

const EventDetails = () => {
  return (
    <section
      id="evento"
      className="relative py-24 md:py-32 px-6 bg-secondary/30"
    >
      <div className="absolute top-0 right-0 rotate-90 z-0 opacity-70">
        <Image src="/asset2.png" alt="Brilhos" width="300" height="300" />
      </div>
      <div className="absolute bottom-0 left-0 rotate-[270deg] z-0 opacity-70">
        <Image src="/asset2.png" alt="Brilhos" width="300" height="300" />
      </div>

      <div className="container relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-7xl md:text-8xl text-foreground mb-4">
            Celebração
          </h2>
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-accent">
            Todos os detalhes do nosso grande dia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <DetailCard icon={MapPin} title="Cerimônia & Recepção" delay={0}>
            <p className="font-semibold">Casa Nossa Eventos</p>
            <p>Av. Assis Brasil, 1144 - Santa Maria Goretti</p>
            <p>Porto Alegre - RS</p>
            <a
              href="https://maps.app.goo.gl/iMm3YfcJeiK9qhPc7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-accent hover:text-accent/80 underline underline-offset-4 transition-colors"
            >
              Ver no mapa →
            </a>
          </DetailCard>

          <DetailCard icon={Clock} title="Horário" delay={0.15}>
            <p>
              Cerimônia às <span className="font-semibold">19h00</span>
            </p>
            <p className="mt-2">Recepção logo após a cerimônia</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Pedimos que cheguem com 30 minutos de antecedência
            </p>
          </DetailCard>

          <DetailCard icon={Shirt} title="Dress Code" delay={0.3}>
            <p className="font-semibold">Traje Esporte Fino</p>
            <p className="mt-2">
              Cores sugeridas: tons neutros, azul marinho, dourado
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Evitar branco e off-white, por favor
            </p>
          </DetailCard>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
