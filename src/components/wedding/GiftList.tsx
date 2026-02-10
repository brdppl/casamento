import { motion } from 'framer-motion';
import { Gift, CreditCard, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const gifts = [
  {
    icon: Gift,
    title: 'Lista de Presentes',
    description:
      'Acesse nossa lista de presentes e escolha algo especial para nós.',
    link: '/presentes',
    linkText: 'Ver lista de presentes',
    linkTarget: '_self',
  },
  {
    icon: CreditCard,
    title: 'PIX',
    description:
      'Se preferir, contribua com qualquer valor via PIX. Chave a ser informada em breve.',
    link: null,
    linkText: 'Chave PIX em breve',
    linkTarget: '_blank',
  },
];

const GiftList = () => {
  return (
    <section
      id="presentes"
      className="relative py-24 md:py-32 px-6 bg-secondary/30 overflow-hidden"
    >
      <div className="absolute bottom-0 right-[-300px] rotate-[170deg] z-0">
        <Image src="/images/asset1.png" alt="Flores" width="700" height="700" />
      </div>

      <div className="container relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-7xl md:text-8xl text-foreground mb-4">
            Lista de Presentes
          </h2>
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-accent">
            Sua presença é o melhor presente
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {gifts.map((gift, i) => (
            <motion.div
              key={gift.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="bg-card bg-[url('/images/asset3.png')] bg-no-repeat bg-cover bg-center border border-border rounded-sm p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-5">
                <gift.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {gift.title}
              </h3>
              <p className="text-foreground/70 font-sans-elegant text-sm leading-relaxed mb-4">
                {gift.description}
              </p>
              {gift.link ? (
                <Link
                  href={gift.link}
                  target={gift.linkTarget}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-sans-elegant text-sm underline underline-offset-4 transition-colors"
                >
                  {gift.linkText}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              ) : (
                <span className="text-muted-foreground font-sans-elegant text-sm">
                  {gift.linkText}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftList;
