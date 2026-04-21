"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  id: string;
  q: string;
  a: string;
}

const defaultFaqs: FAQ[] = [
  {
    id: "faq-1",
    q: "O procedimento das facetas causam dor?",
    a: "Não. O procedimento é minimamente invasivo e, na maioria dos casos, não requer anestesia. As lentes e facetas são aplicadas de forma extremamente cuidadosa para garantir total conforto durante todo o processo.",
  },
  {
    id: "faq-2",
    q: "Qual o tempo de duração das facetas de resina e de porcelana?",
    a: "Com cuidados adequados — higiene correta e visitas regulares ao dentista — as facetas de resina duram em média de 5 a 10 anos, enquanto as de porcelana podem durar entre 10 e 20 anos. Utilizamos materiais de alta performance que garantem a longevidade estética do seu novo sorriso.",
  },
  {
    id: "faq-4",
    q: "As lentes/facetas ficam com aparência artificial?",
    a: "Absolutamente não. Trabalhamos com laboratórios especializados e materiais de última geração que reproduzem fielmente as nuances de cor, translucidez e textura dos dentes naturais. O resultado é indistinguível.",
  },
  {
    id: "faq-5",
    q: "Qualquer pessoa pode fazer lentes de contato dental?",
    a: "A indicação depende de uma avaliação clínica individualizada. Casos de bruxismo severo, problemas periodontais ativos ou oclusão comprometida podem precisar de tratamento prévio. Na consulta, avaliamos se você é candidato ideal.",
  },
  {
    id: "faq-6",
    q: "Existe financiamento disponível?",
    a: "Sim! Oferecemos diversas formas de pagamento, incluindo parcelamento no cartão de crédito e planos de financiamento. Nosso atendimento financeiro personalizado encontra a melhor solução para o seu caso.",
  },
];

interface FaqSectionProps {
  badgeText?: string;
  title?: React.ReactNode;
  faqs?: FAQ[];
}

function FaqItem({
  faq,
  index,
}: {
  faq: FAQ;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      id={faq.id}
      className="rounded-2xl overflow-hidden"
      style={{
        background: open ? "#FAF9F6" : "white",
        border: open ? "1px solid #CBB27A" : "1px solid rgba(142, 111, 58, 0.15)",
        transition: "border-color 0.25s, background 0.25s",
        boxShadow: open ? "0 12px 24px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="font-body font-bold text-sm leading-snug"
          style={{ color: open ? "#0E2A26" : "#2D4D59" }}
        >
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open
              ? "linear-gradient(135deg, #8E6F3A, #CBB27A)"
              : "rgba(142, 111, 58, 0.08)",
          }}
        >
          {open ? (
            <Minus className="w-3.5 h-3.5 text-[#0E2A26]" />
          ) : (
            <Plus className="w-3.5 h-3.5" style={{ color: "#CBB27A" }} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <p className="font-body text-sm text-[#2D4D59]/80 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection({
  badgeText = "Dúvidas Frequentes",
  title = (
    <>
      Tudo que você precisa
      <br />
      <em className="not-italic" style={{ color: "#8E6F3A" }}>
        saber antes de começar
      </em>
    </>
  ),
  faqs = defaultFaqs,
}: FaqSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="section-pad bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-body font-bold uppercase tracking-[0.22em] mb-4"
            style={{ color: "#8E6F3A" }}
          >
            {badgeText}
          </p>
          <h2
            className="font-heading font-bold mb-6 text-[#0E2A26]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            {title}
          </h2>
          <span className="divider-gold mx-auto block" />
        </motion.div>

        {/* FAQ items */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.id} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

