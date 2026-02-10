import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [href, setHref] = useState('');
  const router = useRouter();

  const scrollTo = (href: string) => {
    setHref(href);

    if (router.pathname !== '/') {
      router.push('/');
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleComplete = () => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    };

    if (href) {
      router.events.on('routeChangeComplete', handleComplete);
    }

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [href]);

  return (
    <footer className="relative py-16 px-6 border-t border-border overflow-hidden">
      <div className="absolute bottom-[-315px] left-0">
        <Image src="/asset4.png" alt="Flores" width="550" height="550" />
      </div>
      <div className="absolute bottom-[-315px] right-0 rotate-180">
        <Image src="/asset4.png" alt="Flores" width="550" height="550" />
      </div>

      <div className="container relative mx-auto max-w-3xl text-center">
        <div className="mb-2">
          <span className="font-script text-6xl text-foreground">Isadora</span>
          <span className="font-exception text-2xl text-accent mx-2">&</span>
          <span className="font-script text-6xl text-foreground">Bernardo</span>
        </div>
        <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-accent mb-8">
          15 de Maio de 2027
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          {[
            { label: 'Início', href: '#inicio' },
            { label: 'História', href: '#historia' },
            { label: 'Evento', href: '#evento' },
            { label: 'Presença', href: '#presenca' },
            { label: 'Presentes', href: '#presentes' },
          ].map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-sans-elegant text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="w-16 h-[1px] bg-accent/30 mx-auto mb-6" />
        <p className="font-sans-elegant text-xs text-muted-foreground">
          Feito com amor 💛
        </p>
      </div>
    </footer>
  );
};

export default Footer;
