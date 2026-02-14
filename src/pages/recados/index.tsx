import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircleHeart, Quote, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Head from 'next/head';
import { IMessage } from '@/models/message.model';
import { format } from 'date-fns';
import { listMessages, sendMessage } from '@/api/lib/messages';
import { ptBR } from 'date-fns/locale';
import { SafeHtml } from '@/components/wedding/SafeHtml';

const Mensagens = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) return;

    setIsLoading(true);

    const payload: Partial<IMessage> = {
      name: name.trim().slice(0, 100),
      message: text.trim().slice(0, 2000),
    };

    sendMessage(payload)
      .then(({ title, message }) => {
        setName('');
        setText('');
        toast({ title, description: message });
        fetchMessages();
      })
      .catch((error) => {
        toast({
          title: 'Algo deu errado 😭',
          description: error.data.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchMessages = () => {
    setIsLoadingList(true);
    listMessages()
      .then((data) => {
        setMessages(data);
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
  };

  return (
    <>
      <Head>
        <title>Mural de Recados · Casamento Isa & Be</title>
        <meta name="description" content="Deixe um recado especial para nós" />
        <meta
          property="og:title"
          content="Mural de Recados · Casamento Isa & Be"
        />
        <meta
          property="og:description"
          content="Deixe um recado especial para nós"
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
          content="Mural de Recados · Casamento Isa & Be"
        />
        <meta
          name="twitter:description"
          content="Deixe um recado especial para nós"
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
                <MessageCircleHeart className="w-7 h-7 text-accent" />
              </div>
              <h1 className="font-script text-7xl md:text-8xl text-foreground mb-4">
                Mural de Recados
              </h1>
              <p className="font-sans-elegant text-sm md:text-base text-accent max-w-lg mx-auto leading-relaxed">
                Deixe uma mensagem especial para o casal
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-24 max-w-3xl">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card border border-gold/20 rounded-sm p-6 md:p-8 mb-12 shadow-sm"
          >
            <h2 className="font-sans-elegant text-xl text-navy mb-6">
              Escreva sua mensagem
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
                className="border-gold/30 focus-visible:ring-gold/50 bg-background"
              />
              <Textarea
                placeholder="Sua mensagem para os noivos..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={2000}
                required
                rows={4}
                className="border-gold/30 focus-visible:ring-gold/50 bg-background resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-navy/80">{text.length}/2000</span>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="gold-gradient text-accent-foreground hover:opacity-90 transition-opacity gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar mensagem
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Messages */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-gold/15 rounded-xl p-6 relative"
                >
                  <Quote
                    className="absolute top-4 right-4 text-gold/20"
                    size={24}
                  />
                  <div className="font-serif text-navy/80 leading-relaxed mb-4 pr-8">
                    <SafeHtml content={msg.message} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-sans-elegant text-sm font-semibold text-navy">
                        {msg.name}
                      </span>
                      <span className="text-navy/40 text-xs ml-3">
                        {format(msg.createdAt, "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoadingList && (
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-navy/80 font-sans-elegant">
                <Loader2 className="w-8 h-8 mr-2 animate-spin" />
                Carregando mensagens...
              </div>
            )}

            {messages.length === 0 && !isLoadingList && (
              <p className="text-center text-navy/80 font-sans-elegant py-12">
                Seja o primeiro a deixar uma mensagem! 💕
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mensagens;
