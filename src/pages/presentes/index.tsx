import Head from 'next/head';
import { motion } from 'framer-motion';
import { Gift, CreditCard, ShoppingBag, Loader2 } from 'lucide-react';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IPresent } from '@/models/present.model';
import {
  checkoutPresent,
  checkoutPresentV2,
  checkoutPresentV3,
  listPresents,
} from '@/api/lib/presents';
import { currency } from '@/lib/utils';
import { presentCategories } from '@/const/present-categories';
import { useToast } from '@/hooks/use-toast';

const PIXKey = 'b83367f9-5b5f-4e2b-aed2-960e559a3aed';

export default function PresentsPage() {
  const [open, setOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState('Copiar chave PIX');
  const [categories, setCategories] = useState(presentCategories);
  const [isLoading, setIsLoading] = useState({
    loading: false,
    itemId: '',
  });
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { toast } = useToast();

  const handleCopyPIXKey = () => {
    navigator.clipboard.writeText(PIXKey);
    setTooltipText('Copiado!');
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
      setTooltipText('Copiar chave PIX');
    }, 2000);
  };

  useEffect(() => {
    setIsLoadingList(true);
    listPresents()
      .then((data) => {
        setCategories((value) => {
          const newValue = value.map((val) => ({
            ...val,
            items: data.filter((d) => d.idCategory === val.id),
          }));

          return newValue;
        });
      })
      .catch((error) => {
        toast({
          title: 'Algo deu errado 😭',
          description: error.data.message,
        });
      })
      .finally(() => {
        setIsLoadingList(false);
      });
  }, []);

  const checkout = (id: string) => {
    if (process.env.NEXT_PUBLIC_PAYMENT_API === '1') {
      return checkoutPresent(id);
    } else if (process.env.NEXT_PUBLIC_PAYMENT_API === '2') {
      return checkoutPresentV2(id);
    }

    return checkoutPresentV3(id);
  };

  const hendleBuy = (id: string) => {
    setIsLoading({ loading: true, itemId: id });
    checkout(id)
      .then(({ url }: { url: string }) => {
        console.log('COMPRA REALIZADA', url);
        window.open(url, '_self');
      })
      .catch((error) => {
        toast({
          title: 'Algo deu errado 😭',
          description: error.data.message,
        });
      });
  };

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
          content="https://casamentoisaebe.com.br/images/monograma.png"
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
          content="https://casamentoisaebe.com.br/images/monograma.png"
        />
      </Head>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-secondary/30 pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <Gift className="w-7 h-7 text-accent" />
              </div>
              <h1 className="font-script text-7xl md:text-8xl text-foreground mb-4">
                Lista de Presentes
              </h1>
              <p className="font-sans-elegant text-sm md:text-base text-accent max-w-lg mx-auto leading-relaxed">
                Sua presença é o nosso maior presente! Mas se desejar nos
                presentear, preparamos esta lista com muito carinho.
              </p>
            </motion.div>
          </div>
        </div>

        {/* PIX Section */}
        <section className="px-6 py-20">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border border-border rounded-sm p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Prefere contribuir via PIX?
              </h2>
              <p className="font-sans-elegant text-sm text-muted-foreground mb-4">
                Se preferir, você pode contribuir com qualquer valor no PIX.
              </p>
              <div className="bg-secondary/50 rounded-sm p-4 inline-block max-w-40">
                <p className="font-sans-elegant text-xs text-muted-foreground mb-2">
                  Toque para copiar a chave PIX ou scaneie o QR Code
                </p>
                <Tooltip
                  open={open}
                  onOpenChange={(nextOpen) => {
                    setOpen(nextOpen);
                  }}
                  delayDuration={100}
                >
                  <TooltipTrigger asChild>
                    <div
                      className="bg-white p-2 rounded-sm hover:cursor-pointer"
                      onClick={handleCopyPIXKey}
                    >
                      <Image
                        src="/images/qrcode.png"
                        alt="Chave PIX"
                        width="120"
                        height="120"
                      />
                    </div>
                  </TooltipTrigger>

                  <TooltipContent
                    className="bg-white"
                    side="top"
                    align="center"
                  >
                    {tooltipText}
                  </TooltipContent>
                </Tooltip>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Present Categories */}
        <section className="px-6 pb-24">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-12">
              {isLoadingList && (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-navy/80 font-sans-elegant">
                  <Loader2 className="w-8 h-8 mr-2 animate-spin" />
                  Carregando a lista de presentes...
                </div>
              )}

              {!isLoadingList &&
                categories.map((category, catIdx) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                        <category.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {category.title}
                      </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {category.items.map((item: IPresent) => (
                        <div
                          key={item._id}
                          className={`flex flex-col justify-between border border-border rounded-sm p-5 transition-shadow hover:shadow-md ${
                            item.purchased
                              ? 'bg-secondary/20 opacity-60'
                              : 'bg-card'
                          }`}
                        >
                          <div>
                            <div className="overflow mb-4">
                              <Image
                                src={item.photo}
                                alt={item.name}
                                width="300"
                                height="300"
                              />
                            </div>
                            <div className="flex items-start justify-between mb-3">
                              <ShoppingBag className="w-4 h-4 text-accent/60 mt-0.5" />
                              {item.purchased && (
                                <span className="font-sans-elegant text-[10px] tracking-wider uppercase bg-accent/15 text-accent px-2 py-0.5 rounded-full">
                                  Escolhido
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-1 leading-snug">
                              {item.name}
                            </h3>
                            <p className="font-sans-elegant text-md text-muted-foreground">
                              {currency(item.price)}
                            </p>
                          </div>
                          {!item.purchased && (
                            <Button
                              className="mt-3 w-full gold-gradient text-accent-foreground font-sans-elegant tracking-widest uppercase text-xs py-2 hover:opacity-90 transition-opacity"
                              onClick={() => hendleBuy(item._id)}
                              disabled={
                                isLoading.loading &&
                                isLoading.itemId === item._id
                              }
                            >
                              {isLoading.loading &&
                              isLoading.itemId === item._id ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Preparando...
                                </>
                              ) : (
                                <>Quero presentear</>
                              )}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
