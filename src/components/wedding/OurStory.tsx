import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const OurStory = () => {
  return (
    <section id="historia" className="py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-3xl text-center">
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

          <h2 className="font-script text-5xl md:text-6xl text-foreground mb-4">
            Nossa História
          </h2>
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12">
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
            Algumas histórias são escritas nas estrelas. A nossa começou de um
            jeito simples, com um olhar, um sorriso, e a certeza de que algo
            especial estava nascendo.
          </p>
          <p>
            Desde o primeiro encontro, soubemos que tínhamos algo raro e bonito.
            Cada momento juntos só fortaleceu o que sentimos um pelo outro.
          </p>
          <p>
            Agora, estamos prontos para dar o próximo passo e celebrar nosso
            amor com as pessoas mais importantes das nossas vidas — vocês.
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
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-secondary rounded-sm flex items-center justify-center"
            >
              <span className="font-sans-elegant text-xs tracking-widest uppercase text-muted-foreground">
                Foto {i}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
