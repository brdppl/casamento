const Footer = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="font-script text-4xl text-foreground mb-2">
          Isadora & Bernardo
        </div>
        <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
          15 de Maio de 2027
        </p>

        <div className="flex items-center justify-center gap-6 mb-8">
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
