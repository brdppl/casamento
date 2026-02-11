import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from './Lightbox';

const photos = [
  { id: 1, path: '/images/foto1.jpeg', label: '' },
  { id: 2, path: '/images/foto5.jpeg', label: '' },
  { id: 3, path: '/images/foto4.jpeg', label: '' },
  { id: 4, path: '/images/foto2.jpeg', label: '' },
  { id: 5, path: '/images/foto6.jpeg', label: '' },
  { id: 6, path: '/images/foto3.jpeg', label: '' },
];

const OurStory = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openPhoto = (index: number) => setSelectedIndex(index);

  return (
    <>
      <section
        id="historia"
        className="relative py-24 md:py-32 px-6 overflow-hidden"
      >
        <div className="absolute bottom-0 left-[-300px] rotate-[340deg] z-0">
          <Image
            src="/images/asset1.png"
            alt="Flores"
            width="700"
            height="700"
          />
        </div>

        <div className="container relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-accent/40" />
              <Heart className="w-4 h-4 text-accent" />
              <div className="w-12 h-[1px] bg-accent/40" />
            </div>

            <h2 className="font-script text-7xl md:text-8xl text-foreground mb-4">
              Nossa História
            </h2>
            <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-accent mb-12">
              Como tudo começou
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg leading-relaxed text-foreground/80"
          >
            <p>
              Nossa história começou de forma inesperada, mas daquelas que
              parecem escritas pelo destino. Em meio a conversas despretensiosas
              e risadas, nos vimos pela primeira vez — e a conexão foi imediata,
              daquelas que a gente sente sem precisar explicar.
            </p>
            <p>
              Ao longo desses 2 anos juntos, vivemos momentos inesquecíveis,
              superamos desafios, comemoramos conquistas e descobrimos, a cada
              dia, que fazemos muito mais sentido lado a lado. Aprendemos a ser
              apoio, risada, abraço e lar um para o outro.
            </p>
            <p>
              Hoje, temos a certeza de que aquela conexão lá do começo tinha um
              propósito: nos trazer até aqui. É com muito amor e alegria que
              estamos prontos para escrever os próximos capítulos da nossa
              história e queremos celebrar esse momento especial com as pessoas
              mais importantes das nossas vidas — vocês.
            </p>
          </motion.div>

          {/* Photo placeholders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => openPhoto(i)}
                className="aspect-[3/4] bg-secondary rounded-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 overflow-hidden"
              >
                <span className="font-sans-elegant text-xs tracking-widest uppercase text-muted-foreground">
                  <Image
                    src={photo.path}
                    alt={`Foto ${photo.id}`}
                    width="400"
                    height="400"
                  />
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        photos={photos}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </>
  );
};

export default OurStory;
