import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const links = [
  { label: 'Início', href: '#inicio' },
  { label: 'Nossa História', href: '#historia' },
  { label: 'Evento', href: '#evento' },
  { label: 'Presença', href: '#presenca' },
  { label: 'Presentes', href: '#presentes' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [href, setHref] = useState('');
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setIsActiveIndex(0);
    const handleScroll = () => {
      const scroll = window.scrollY;
      const divStory = document.getElementById('historia')?.offsetTop! - 150;
      const divEventDetails =
        document.getElementById('evento')?.offsetTop! - 150;
      const divRSVP = document.getElementById('presenca')?.offsetTop! - 150;
      const divGiftList =
        document.getElementById('presentes')?.offsetTop! - 150;

      if (scroll < divStory) {
        setIsActiveIndex(0);
      } else if (scroll > divStory && scroll < divEventDetails) {
        setIsActiveIndex(1);
      } else if (scroll > divEventDetails && scroll < divRSVP) {
        setIsActiveIndex(2);
      } else if (scroll > divRSVP && scroll < divGiftList) {
        setIsActiveIndex(3);
      } else {
        setIsActiveIndex(4);
      }

      return setScrolled(scroll > 5);
    };

    if (router.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }

    if (router.pathname === '/presentes') {
      setIsActiveIndex(4);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);

  const scrollTo = (href: string) => {
    setHref(href);
    setMobileOpen(false);

    if (router.pathname !== '/') {
      router.push('/');
      setScrolled(false);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/50 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <button
          onClick={() => scrollTo('#inicio')}
          className="font-script text-2xl text-accent"
        >
          <Image src="/images/logo.png" alt="I & B" width="70" height="70" />
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`font-sans-elegant text-sm font-medium tracking-widest uppercase ${isActiveIndex === i ? 'text-accent' : 'text-foreground/70'} hover:text-accent transition-colors`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-t border-border"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {links.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`font-sans-elegant text-sm font-medium tracking-widest uppercase ${isActiveIndex === i ? 'text-accent' : 'text-foreground/70'} hover:text-accent transition-colors`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </nav>
  );
};

export default Navbar;
