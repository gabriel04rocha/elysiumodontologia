"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles, Shield, Zap, Eye } from "lucide-react";

const treatments = [
  {
    id: "lentes",
    icon: Sparkles,
    title: "Lentes de Contato Dental",
    subtitle: "Ultra-conservador",
    description:
      "As lentes de contato dental são lâminas de porcelana com apenas 0,3mm de espessura. Sem desgaste do dente natural — aderidas diretamente ao esmalte para um resultado impecável.",
    benefits: ["Sem desgaste dental", "Resultado em 2 sessões", "Duração de até 20 anos"],
    accent: "#41c1bb",
  },
  {
    id: "facetas",
    icon: Shield,
    title: "Facetas de Porcelana",
    subtitle: "Alta estética",
    description:
      "As facetas cobrem a face frontal do dente, corrigindo cor, forma e alinhamento. Indicadas para casos mais complexos, com resultado natural e altamente personalizado.",
    benefits: ["Correção de formato", "Cor personalizada", "Alta resistência"],
    accent: "#375c6d",
  },
  {
    id: "digital",
    icon: Eye,
    title: "Simulação Digital",
    subtitle: "Veja antes de decidir",
    description:
      "Com o planejamento digital, você visualiza o resultado do seu novo sorriso ainda na consulta — antes de qualquer procedimento. Zero surpresas, total segurança.",
    benefits: ["Visualização prévia", "Planejamento preciso", "Resultado previsível"],
    accent: "#4f7f94",
  },
  {
    id: "clareamento",
    icon: Zap,
    title: "Clareamento Dental",
    subtitle: "Complemento perfeito",
    description:
      "O clareamento profissional potencializa o resultado das lentes e facetas. Realizado com tecnologia LED de última geração para efeito máximo com mínima sensibilidade.",
    benefits: ["Até 8 tons mais claro", "Baixa sensibilidade", "Resultado imediato"],
    accent: "#2d9f99",
  },
];

function TreatmentCard({
  treatment,
  index,
}: {
  treatment: (typeof treatments)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const Icon = treatment.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      id={`treatment-${treatment.id}`}
      className="hover-lift group relative bg-white rounded-3xl p-8 flex flex-col gap-5 overflow-hidden"
      style={{
        boxShadow: "0 4px 24px rgba(55,92,109,0.08)",
        border: "1px solid #e4f4f3",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
        style={{
          background: `linear-gradient(90deg, ${treatment.accent}, #6dd3ce)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: `${treatment.accent}18` }}
      >
        <Icon className="w-6 h-6" style={{ color: treatment.accent }} />
      </div>

      {/* Subtitle */}
      <p
        className="text-xs font-body font-semibold uppercase tracking-[0.18em]"
        style={{ color: treatment.accent }}
      >
        {treatment.subtitle}
      </p>

      {/* Title */}
      <h3
        className="font-heading font-semibold text-2xl leading-tight"
        style={{ color: "#1a2f38" }}
      >
        {treatment.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm leading-relaxed text-slate-500">
        {treatment.description}
      </p>

      {/* Benefits */}
      <ul className="flex flex-col gap-2 mt-auto">
        {treatment.benefits.map((b) => (
          <li key={b} className="flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: treatment.accent }}
            />
            <span className="text-xs font-body text-slate-600">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function TreatmentsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="tratamentos" className="section-pad bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-body font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: "#41c1bb" }}
          >
            Nossos Tratamentos
          </p>
          <h2
            className="font-heading font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1a2f38" }}
          >
            Soluções que transformam
            <br />
            <em className="not-italic" style={{ color: "#41c1bb" }}>
              cada sorriso
            </em>
          </h2>
          <span className="divider-teal mx-auto block" />
          <p
            className="font-body text-slate-500 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Cada tratamento é planejado individualmente, respeitando as
            características únicas do seu rosto, dentes e personalidade.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((t, i) => (
            <TreatmentCard key={t.id} treatment={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
