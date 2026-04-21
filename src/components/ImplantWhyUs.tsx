"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Target, Zap, Clock } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Cirurgia Guiada",
    desc: "A tecnologia que permite instalar o implante sem a necessidade de aberturas extensas ou pontos, acelerando a cicatrização.",
  },
  {
    icon: Target,
    title: "Planejamento 3D",
    desc: "Utilizamos softwares de última geração para prever cada milímetro do seu novo sorriso antes mesmo de começar.",
  },
  {
    icon: Zap,
    title: "Materiais Premium",
    desc: "Trabalhamos com os melhores sistemas do mundo, garantindo biocompatibilidade total e durabilidade vitalícia.",
  },
  {
    icon: Clock,
    title: "Conforto Pós-Operatório",
    desc: "Técnicas minimamente invasivas que permitem que a grande maioria dos pacientes retorne à rotina em 48 horas.",
  },
];

export function ImplantWhyUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="por-que-elysium"
      className="section-pad relative overflow-hidden"
      style={{ background: "#0E2A26" }}
    >
      {/* Visual background details */}
      <div
        className="absolute left-[-100px] top-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #CBB27A 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <p
              className="text-xs font-body font-bold uppercase tracking-[0.22em] mb-4"
              style={{ color: "#CBB27A" }}
            >
              Excelência Cirúrgica
            </p>
            <h2
              className="font-heading font-bold mb-6 text-white"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Tecnologia que elimina os{" "}
              <em className="not-italic text-gold">antigos receios</em>
            </h2>
            <p className="font-body text-white/70 mb-10 leading-relaxed max-w-xl">
              Esqueça tudo o que você já ouviu sobre implantes dolorosos. Na Elysium, aliamos o planejamento digital 3D à cirurgia guiada para entregar um procedimento rápido, seguro e com o máximo conforto pós-operatório.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex flex-col gap-3 p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-lg">{p.title}</h3>
                    <p className="font-body text-sm text-white/50 leading-snug">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div
              className="relative aspect-square rounded-[40px] overflow-hidden border border-gold/20"
              style={{
                background: "linear-gradient(135deg, #123531 0%, #071715 100%)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mb-8">
                  <ShieldCheck className="w-10 h-10 text-gold" />
                </div>
                <h3 className="font-heading font-bold text-3xl text-white mb-4">
                  Segurança em primeiro lugar
                </h3>
                <p className="font-body text-white/60">
                  Nosso protocolo segue rigorosamente as diretrizes da odontologia moderna, garantindo que você tenha o melhor que a tecnologia pode oferecer.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
