import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { confirmPresence } from '@/api/lib/RSVP';

const rsvpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100),
  email: z.string().trim().email('E-mail inválido').max(255),
  confirmed: z.enum(['Sim', 'Não'], {
    errorMap: () => ({ message: 'Selecione uma opção' }),
  }),
  restrictions: z.string().max(500).optional(),
});

type RSVPData = z.infer<typeof rsvpSchema>;

const RSVPForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RSVPData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { name: '', email: '', confirmed: 'Sim', restrictions: '' },
  });

  const onSubmit = (data: RSVPData) => {
    setIsLoading(true);

    if (!isLoading) {
      confirmPresence(data)
        .then(({ title, message }) => {
          setSubmitted(true);
          toast({ title, description: message });
        })
        .catch((error) => {
          toast({
            title: 'Algo deu errado',
            description: error.data.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  if (submitted) {
    return (
      <section id="presenca" className="py-24 md:py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container mx-auto max-w-lg text-center"
        >
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="font-script text-7xl text-foreground mb-4">
            Obrigado!
          </h2>
          {form.getValues('confirmed') === 'Sim' ? (
            <p className="text-foreground/70 font-sans-elegant">
              Sua presença foi confirmada. Mal podemos esperar para celebrar com
              você!
            </p>
          ) : (
            <></>
          )}
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="presenca"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="absolute top-0 right-[-150px] rotate-[200deg] z-0">
        <Image src="/images/asset1.png" alt="Flores" width="400" height="400" />
      </div>
      <div className="absolute bottom-0 left-[-150px] rotate-[10deg] z-0">
        <Image src="/images/asset1.png" alt="Flores" width="400" height="400" />
      </div>

      <div className="container relative mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-script text-7xl md:text-8xl text-foreground mb-4">
            Confirme sua Presença
          </h2>
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-accent">
            Ficaremos felizes com a sua presença
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans-elegant text-sm tracking-wide">
                      Nome completo
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome"
                        className="bg-card border-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans-elegant text-sm tracking-wide">
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        className="bg-card border-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans-elegant text-sm tracking-wide">
                      Você vai comparecer?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Sim" id="attending-yes" />
                            <Label
                              htmlFor="attending-yes"
                              className="font-sans-elegant cursor-pointer"
                            >
                              Sim, vou!
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Não" id="attending-no" />
                            <Label
                              htmlFor="attending-no"
                              className="font-sans-elegant cursor-pointer"
                            >
                              Não poderei ir
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="restrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans-elegant text-sm tracking-wide">
                      Restrições alimentares{' '}
                      <span className="text-muted-foreground">(opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Vegetariano, alergia a frutos do mar, etc."
                        className="bg-card border-border resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gold-gradient text-accent-foreground font-sans-elegant tracking-widest uppercase text-sm py-6 hover:opacity-90 transition-opacity"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Confirmar Presença
                  </>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPForm;
