"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ResultsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="resultados" className="section-pad bg-white">
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
            Transformações Reais
          </p>
          <h2
            className="font-heading font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1a2f38" }}
          >
            Resultados que falam
            <br />
            <em className="not-italic" style={{ color: "#41c1bb" }}>
              por si mesmos
            </em>
          </h2>
          <span className="divider-teal mx-auto block" />
          <p className="font-body text-slate-500 mt-6 max-w-xl mx-auto text-sm leading-relaxed">
            Casos reais, resultados reais. Cada sorriso é único e planejado
            individualmente por nossa equipe.
          </p>
        </motion.div>

        {/* Grid de resultados */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Card 1 — Close-up antes/depois stacked */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="hover-lift rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(55,92,109,0.12)", border: "1px solid #e4f4f3" }}
          >
            <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/Antes e depois (close-up)/closeup-antesdepois-stacked.jpg"
                alt="Resultado antes e depois — comparação de dentes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-body font-semibold"
                style={{ background: "rgba(55,92,109,0.85)", color: "white", backdropFilter: "blur(8px)" }}
              >
                Antes → Depois
              </div>
            </div>
            <div className="p-6 bg-white">
              <span
                className="text-xs font-body font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
                style={{ background: "rgba(65,193,187,0.12)", color: "#2d9f99" }}
              >
                Facetas de Porcelana
              </span>
              <p className="font-body text-sm text-slate-500 mt-3">
                Correção de cor, forma e alinhamento com resultado natural e duradouro.
              </p>
            </div>
          </motion.div>

          {/* Card 2 — Close-up resultado final */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="hover-lift rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(55,92,109,0.12)", border: "1px solid #e4f4f3" }}
          >
            <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/Antes e depois (close-up)/closeup-depois-1-real.jpg"
                alt="Sorriso perfeito após tratamento com lentes de contato dental"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-body font-semibold"
                style={{ background: "rgba(65,193,187,0.9)", color: "white", backdropFilter: "blur(8px)" }}
              >
                Resultado Final
              </div>
            </div>
            <div className="p-6 bg-white">
              <span
                className="text-xs font-body font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
                style={{ background: "rgba(65,193,187,0.12)", color: "#2d9f99" }}
              >
                Lentes de Contato Dental
              </span>
              <p className="font-body text-sm text-slate-500 mt-3">
                Sorriso uniforme e luminoso com lentes ultrafinas — zero desgaste dental.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            id="results-cta"
            href="/contato"
            className="btn-teal inline-block px-10 py-3.5 text-base font-semibold"
          >
            Quero transformar meu sorriso
          </a>
        </motion.div>
      </div>
    </section>
  );
}
