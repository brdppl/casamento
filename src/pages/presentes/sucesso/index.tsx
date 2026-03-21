import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Loader2, PartyPopper, Send, Sparkles } from 'lucide-react';
import { useRouter } from 'next/router';
import { listOnePresent, sendMessage } from '@/api/lib/presents';
import { useSearchParams } from 'next/navigation';
import { IPresent } from '@/models/present.model';
import { useToast } from '@/hooks/use-toast';

const REDIRECT_SECONDS = 10;

export default function PresentsSuccessPage() {
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const [present, setPresent] = useState<IPresent>({} as IPresent);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (params && params.get('id')) {
      fetchPresent();
    }
  }, [params]);

  useEffect(() => {
    if (sent) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push('/presentes');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sent]);

  const handleSendMessage = async () => {
    if (!name.trim() || !message.trim()) return;
    setIsSending(true);

    const messageData = {
      name: name.trim(),
      message: message.trim(),
      present: present.name,
    };

    sendMessage(messageData)
      .then(() => {
        setSent(true);
      })
      .catch((error) => {
        toast({
          title: 'Algo deu errado 😭',
          description: error?.data?.message,
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const fetchPresent = () => {
    const id = params.get('id')!;

    listOnePresent(id).then((data) => {
      setPresent(data);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background backdrop-blur-sm px-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-md"
      >
        {/* Animated icons */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center"
          >
            <Heart className="w-10 h-10 text-accent fill-accent" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, x: -20, y: -20 }}
            animate={{ scale: 1, x: -30, y: -30 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute"
          >
            <Sparkles className="w-5 h-5 text-accent/60" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, x: 20, y: -15 }}
            animate={{ scale: 1, x: 35, y: -25 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="absolute"
          >
            <PartyPopper className="w-6 h-6 text-accent/50" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-script text-7xl md:text-8xl text-foreground mb-4"
        >
          Obrigado!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="font-sans-elegant text-sm text-muted-foreground leading-relaxed mb-2"
        >
          Ficamos muito felizes com o seu presente!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-accent/10 rounded-sm px-5 py-3 mb-5 inline-block"
        >
          <p className="font-sans-elegant text-xs text-muted-foreground mb-0.5">
            Você escolheu
          </p>
          <p className="font-semibold text-foreground text-sm">
            {present.name}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-sans-elegant text-xs text-muted-foreground mb-6"
        >
          Nós agradecemos de coração 💛
        </motion.p>

        {/* Countdown */}
        {/* Message form or sent confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <>
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent/10 rounded-sm p-6 mb-6"
                >
                  <p className="font-sans-elegant text-sm text-foreground font-medium mb-1">
                    Mensagem enviada! 💌
                  </p>
                  <p className="font-sans-elegant text-xs text-muted-foreground">
                    Iremos ler com carinho.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col items-center gap-3 mb-4"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-accent/30 flex items-center justify-center">
                    <span className="text-lg font-semibold text-accent">
                      {countdown}
                    </span>
                  </div>
                  <p className="font-sans-elegant text-[11px] text-muted-foreground tracking-wide">
                    Voltando para a lista de presentes...
                  </p>
                </motion.div>
              </>
            ) : (
              <motion.div
                key="form"
                exit={{ opacity: 0 }}
                className="border border-border rounded-sm p-5 mb-6 text-left"
              >
                <p className="font-sans-elegant text-sm text-foreground font-medium mb-1 text-center">
                  Deseja deixar uma mensagem para os noivos?
                </p>
                <p className="font-sans-elegant text-xs text-muted-foreground mb-4 text-center">
                  Não é obrigatório — mas iremos adorar!
                </p>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-border bg-background rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground mb-3 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <textarea
                  placeholder="Sua mensagem para Isadora & Bernardo..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full border border-border bg-background rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground mb-3 focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!name.trim() || !message.trim() || isSending}
                  className="w-full font-sans-elegant text-xs tracking-wider uppercase bg-accent text-accent-foreground py-2.5 rounded-sm hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Enviar mensagem
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => router.push('/presentes')}
            className="font-sans-elegant text-xs text-accent underline underline-offset-4 hover:text-accent/80 transition-colors mt-1"
          >
            Voltar agora
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
