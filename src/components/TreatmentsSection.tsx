"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles, Shield, Zap, Eye } from "lucide-react";

interface Treatment {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  accent: string;
}

const defaultTreatments: Treatment[] = [
  {
    id: "resina",
    icon: Sparkles,
    title: "Facetas de Resina",
    subtitle: "Nosso Carro-Chefe",
    description:
      "A solução mais versátil para transformar seu sorriso. A resina premium permite correções precisas de cor e forma em tempo recorde, com acabamento natural e alta durabilidade.",
    benefits: ["Transformação imediata", "Minimamente invasivo", "Custo-benefício excelente"],
    accent: "#CBB27A",
  },
  {
    id: "porcelana",
    icon: Shield,
    title: "Lentes de Porcelana",
    subtitle: "Estética Premium",
    description:
      "Lâminas ultrafinas de cerâmica que oferecem a máxima resistência e estabilidade de cor ao longo dos anos. Ideais para quem busca o máximo em sofisticação.",
    benefits: ["Alta durabilidade", "Resistência a manchas", "Brilho permanente"],
    accent: "#8E6F3A",
  },
  {
    id: "digital",
    icon: Eye,
    title: "Simulação Digital",
    subtitle: "Veja antes de decidir",
    description:
      "Com o planejamento digital, você visualiza o resultado do seu novo sorriso ainda na consulta — antes de qualquer procedimento. Zero surpresas, total segurança.",
    benefits: ["Visualização prévia", "Planejamento preciso", "Resultado previsível"],
    accent: "#F3E6C2",
  },
  {
    id: "clareamento",
    icon: Zap,
    title: "Clareamento Dental",
    subtitle: "Complemento perfeito",
    description:
      "O clareamento profissional potencializa o resultado das lentes e facetas. Realizado com tecnologia LED de última geração para efeito máximo com mínima sensibilidade.",
    benefits: ["Até 8 tons mais claro", "Baixa sensibilidade", "Resultado imediato"],
    accent: "#CBB27A",
  },
];

interface TreatmentsSectionProps {
  badgeText?: string;
  title?: React.ReactNode;
  description?: string;
  treatments?: Treatment[];
}

function TreatmentCard({
  treatment,
  index,
}: {
  treatment: Treatment;
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
        boxShadow: "0 12px 32px rgba(203, 178, 122, 0.12)",
        border: "1px solid rgba(203, 178, 122, 0.15)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
        style={{
          background: `linear-gradient(90deg, ${treatment.accent}, #F3E6C2)`,
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
        className="font-heading font-bold text-2xl leading-tight text-[#0E2A26]"
      >
        {treatment.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm leading-relaxed text-[#2D4D59]/80">
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
            <span className="text-xs font-body text-[#2D4D59]/70">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function TreatmentsSection({
  badgeText = "Nossos Tratamentos",
  title = (
    <>
      Soluções que transformam
      <br />
      <em className="not-italic" style={{ color: "#8E6F3A" }}>
        cada sorriso
      </em>
    </>
  ),
  description = "Cada tratamento é planejado individualmente, respeitando as características únicas do seu rosto, dentes e personalidade.",
  treatments = defaultTreatments,
}: TreatmentsSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="tratamentos" className="section-pad bg-[#FAF9F6]">
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
            className="text-xs font-body font-bold uppercase tracking-[0.22em] mb-4"
            style={{ color: "#CBB27A" }}
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
          <p
            className="font-body text-[#2D4D59]/80 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
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

