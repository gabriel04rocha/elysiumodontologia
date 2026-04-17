"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    number: "01",
    title: "Consulta & Diagnóstico",
    description:
      "Avaliamos seu sorriso, histórico de saúde bucal e entendemos seus objetivos estéticos com toda atenção e cuidado.",
  },
  {
    number: "02",
    title: "Simulação Digital",
    description:
      "Criamos uma simulação 3D do seu novo sorriso para que você visualize o resultado antes mesmo de iniciar o tratamento.",
  },
  {
    number: "03",
    title: "Moldagem & Confecção",
    description:
      "Os moldes precisos são enviados ao laboratório especializado, onde as lentes ou facetas são confeccionadas artesanalmente.",
  },
  {
    number: "04",
    title: "Aplicação & Resultado",
    description:
      "Em uma única sessão realizamos a colagem das peças e você sai da clínica com o sorriso dos seus sonhos.",
  },
];

export function ProcessSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="processo"
      className="section-pad relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0E2A26 0%, #123531 100%)",
      }}
    >
      {/* Decorative blob */}
      <div
        className="absolute right-[-120px] top-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(203, 178, 122, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            Como Funciona
          </p>
          <h2
            className="font-heading font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#F3E6C2" }}
          >
            Do diagnóstico ao sorriso perfeito
            <br />
            <em className="not-italic" style={{ color: "#CBB27A" }}>
              em 4 passos simples
            </em>
          </h2>
          <span className="divider-gold mx-auto block" />
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line – desktop */}
          <div
            className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #CBB27A 20%, #CBB27A 80%, transparent)",
              opacity: 0.3,
            }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const { ref: sRef, inView: sInView } = useInView({
                triggerOnce: true,
                threshold: 0.2,
              });

              return (
                <motion.div
                  key={step.number}
                  ref={sRef}
                  initial={{ opacity: 0, y: 36 }}
                  animate={sInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                  id={`step-${step.number}`}
                  className="flex flex-col items-center text-center gap-5"
                >
                  {/* Number bubble */}
                  <div
                    className="w-[88px] h-[88px] rounded-full flex items-center justify-center relative flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #8E6F3A 0%, #CBB27A 100%)",
                      boxShadow: "0 12px 32px rgba(142, 111, 58, 0.35)",
                    }}
                  >
                    <span className="font-heading font-bold text-[#0E2A26] text-3xl leading-none">
                      {step.number}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="font-heading font-semibold text-xl mb-2"
                      style={{ color: "#F3E6C2" }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-gold-light/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
