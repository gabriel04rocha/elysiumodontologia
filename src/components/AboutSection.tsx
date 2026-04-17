"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Users, Microscope, Heart } from "lucide-react";

const pillars = [
  {
    icon: Award,
    title: "Excelência Clínica",
    desc: "Formação contínua e técnicas atualizadas para entregar o melhor resultado.",
  },
  {
    icon: Users,
    title: "Atendimento Humanizado",
    desc: "Cada paciente é único. Ouvimos, entendemos e criamos um plano personalizado.",
  },
  {
    icon: Microscope,
    title: "Tecnologia de Ponta",
    desc: "Equipamentos modernos e materiais premium para precisão e durabilidade.",
  },
  {
    icon: Heart,
    title: "Construção de Confiança",
    desc: "Transparência em cada etapa — sem surpresas, com resultados reais.",
  },
];

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="sobre"
      className="section-pad relative overflow-hidden"
      style={{ background: "white" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left – visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            {/* Main card */}
            <div
              className="rounded-3xl overflow-hidden p-10 flex flex-col gap-6 relative"
              style={{
                background:
                  "linear-gradient(135deg, #8E6F3A 0%, #CBB27A 100%)",
                boxShadow: "0 32px 80px rgba(142, 111, 58, 0.4)",
              }}
            >
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(243, 230, 194, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(243, 230, 194, 0.2) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              <div className="relative z-10">
                <p
                  className="font-heading font-bold text-white leading-tight mb-4"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Excelência em transformar
                  <br />
                  sorrisos no Gama - DF
                </p>
                <p className="font-body text-white/75 text-sm leading-relaxed">
                  A Elysium Odontologia nasceu da crença de que um sorriso
                  bonito é um direito de todos. Unimos ciência, arte e
                  tecnologia para criar experiências que transformam não apenas
                  os dentes, mas a autoestima e a vida dos nossos pacientes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right – pillars */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p
                className="text-xs font-body font-bold uppercase tracking-[0.22em] mb-4"
                style={{ color: "#CBB27A" }}
              >
                Sobre nós
              </p>
              <h2
                className="font-heading font-bold mb-4 text-[#0E2A26]"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                Por que escolher a{" "}
                <em className="not-italic" style={{ color: "#8E6F3A" }}>
                  Elysium?
                </em>
              </h2>
              <span className="divider-gold block mb-6" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="hover-lift rounded-2xl p-5 flex flex-col gap-3"
                    style={{
                      background: "#FAF9F6",
                      border: "1px solid rgba(142, 111, 58, 0.15)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(142, 111, 58, 0.08)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#8E6F3A" }} />
                    </div>
                    <p className="font-heading font-semibold text-lg text-[#0E2A26]">
                      {p.title}
                    </p>
                    <p className="font-body text-xs text-[#2D4D59]/60 leading-relaxed">
                      {p.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <a
              id="about-cta"
              href="#contato"
              className="btn-gold inline-block self-start mt-2 px-8 py-3.5 text-sm font-bold"
            >
              Conhecer a clínica →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
