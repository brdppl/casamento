import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WEDDING_DATE = new Date('2027-05-15T19:00:00');

const calculateTimeLeft = () => {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-6xl font-light text-foreground tabular-nums">
      {String(value).padStart(2, '0')}
    </span>
    <span className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-accent mt-2">
      {label}
    </span>
  </div>
);

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Decorative botanical elements */}
      <div className="absolute top-[-315px] left-0">
        <Image src="/images/asset4.png" alt="Flores" width="600" height="600" />
      </div>
      <div className="absolute top-[-315px] right-0 rotate-180">
        <Image src="/images/asset4.png" alt="Flores" width="600" height="600" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center z-10"
      >
        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 text-accent">
            <div className="w-16 h-[1px] gold-gradient" />
            <span className="font-sans-elegant text-xs tracking-[0.5em] uppercase">
              Casamento
            </span>
            <div className="w-16 h-[1px] gold-gradient" />
          </div>
        </motion.div>

        {/* Names */}
        <h1 className="font-script text-8xl md:text-9xl lg:text-[12rem]/[.65] text-foreground leading-tight">
          Isadora
        </h1>
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="w-12 h-[1px] bg-accent/40" />
          <span className="font-exception text-2xl md:text-4xl text-accent">
            &
          </span>
          <div className="w-12 h-[1px] bg-accent/40" />
        </div>
        <h1 className="font-script text-8xl md:text-9xl lg:text-[12rem]/[.65] text-foreground leading-tight">
          Bernardo
        </h1>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-sans-elegant text-sm tracking-[0.4em] uppercase text-accent mt-8"
        >
          15 de Maio de 2027
        </motion.p>

        {/* Countdown */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 flex items-center gap-6 md:gap-10 justify-center"
          >
            <CountdownUnit value={timeLeft.days} label="Dias" />
            <span className="text-accent text-2xl font-light">:</span>
            <CountdownUnit value={timeLeft.hours} label="Horas" />
            <span className="text-accent text-2xl font-light">:</span>
            <CountdownUnit value={timeLeft.minutes} label="Min" />
            <span className="text-accent text-2xl font-light">:</span>
            <CountdownUnit value={timeLeft.seconds} label="Seg" />
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-8 bg-accent/40 mx-auto"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
