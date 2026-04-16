"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "faq-1",
    q: "As lentes de contato dental doem?",
    a: "Não. O procedimento é minimamente invasivo e, na maioria dos casos, não requer anestesia. As lentes são ultrafinas e coladas sobre o esmalte sem a necessidade de desgaste dental significativo.",
  },
  {
    id: "faq-2",
    q: "Quanto tempo duram as facetas de porcelana?",
    a: "Com cuidados adequados — higiene correta e visitas regulares ao dentista — as facetas de porcelana podem durar entre 10 e 20 anos. A qualidade do material e a técnica de aplicação são determinantes para a durabilidade.",
  },
  {
    id: "faq-3",
    q: "Em quantas sessões vejo o resultado?",
    a: "Para lentes de contato dental, em geral o resultado é concluído em 2 a 3 sessões. Facetas de porcelana podem requerer entre 2 e 4 sessões dependendo do número de dentes e da complexidade do caso.",
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

function FaqItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[0];
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
        background: open ? "white" : "#f7fefe",
        border: open ? "1px solid #41c1bb" : "1px solid #e4f4f3",
        transition: "border-color 0.25s, background 0.25s",
        boxShadow: open ? "0 8px 24px rgba(65,193,187,0.14)" : "none",
      }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="font-body font-medium text-sm leading-snug"
          style={{ color: open ? "#1a2f38" : "#2d4d59" }}
        >
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open
              ? "linear-gradient(135deg, #2d9f99, #41c1bb)"
              : "rgba(65,193,187,0.12)",
          }}
        >
          {open ? (
            <Minus className="w-3.5 h-3.5 text-white" />
          ) : (
            <Plus className="w-3.5 h-3.5" style={{ color: "#41c1bb" }} />
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
              <p className="font-body text-sm text-slate-500 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
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
            className="text-xs font-body font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: "#41c1bb" }}
          >
            Dúvidas Frequentes
          </p>
          <h2
            className="font-heading font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1a2f38" }}
          >
            Tudo que você precisa
            <br />
            <em className="not-italic" style={{ color: "#375c6d" }}>
              saber antes de começar
            </em>
          </h2>
          <span className="divider-teal mx-auto block" />
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
