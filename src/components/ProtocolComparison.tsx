"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X, Banana, Smile, Anchor, Utensils } from "lucide-react";

const comparisonFeatures = [
  {
    label: "Sabor dos Alimentos",
    denture: "Prejudicado pelo céu da boca",
    protocol: "Preservação total do paladar",
    icon: Utensils,
  },
  {
    label: "Estabilidade ao Falar",
    denture: "Risco de deslocamento e ruídos",
    protocol: "Fixo. Total segurança e naturalidade",
    icon: Anchor,
  },
  {
    label: "Força de Mastigação",
    denture: "Reduzida em até 80%",
    protocol: "Igual à dos dentes naturais",
    icon: Banana,
  },
  {
    label: "Aparência Estética",
    denture: "Pode parecer artificial",
    protocol: "Resultado indistinguível e rejuvenescimento",
    icon: Smile,
  },
];

export function ProtocolComparison() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="comparativo" className="section-pad bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="text-xs font-body font-bold uppercase tracking-[0.22em] mb-4 text-gold-dark"
          >
            A Evolução do Sorriso
          </p>
          <h2
            className="font-heading font-bold mb-6 text-deep-green"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            Sinta novamente o prazer de <em className="not-italic text-gold-dark">sorrir e comer</em>
          </h2>
          <p className="font-body text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Veja a comparação direta entre as dentaduras convencionais e o Protocolo sobre Implantes, e entenda por que esta é a escolha certa para sua vida.
          </p>
        </div>

        <div className="grid gap-4 mt-12">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-3 gap-8 px-8 py-4 mb-4">
            <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Benefício</div>
            <div className="text-center text-sm font-bold uppercase tracking-widest text-red-600">Dentadura Comum</div>
            <div className="text-center text-sm font-bold uppercase tracking-widest text-deep-green">Protocolo Elysium</div>
          </div>

          {/* Rows */}
          {comparisonFeatures.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="grid md:grid-cols-3 gap-4 md:gap-8 items-center p-6 md:p-8 rounded-3xl bg-[#FAF9F6] border border-slate-200 group hover:border-gold-mid/30 transition-all duration-300"
              >
                {/* Feature Name */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                    <Icon className="w-5 h-5 text-gold-dark" />
                  </div>
                  <span className="font-heading font-bold text-deep-green">{item.label}</span>
                </div>

                {/* Denture Column */}
                <div className="flex flex-col md:items-center gap-2 p-4 md:p-0 bg-red-50/50 md:bg-transparent rounded-2xl md:rounded-none">
                  <div className="flex items-center gap-2 text-red-600 md:hidden font-bold text-xs uppercase">Dentadura Comum</div>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-sm text-slate-600">{item.denture}</span>
                  </div>
                </div>

                {/* Protocol Column */}
                <div className="flex flex-col md:items-center gap-2 p-4 md:p-0 bg-teal-50/50 md:bg-transparent rounded-2xl md:rounded-none border-2 border-teal-100 md:border-none">
                  <div className="flex items-center gap-2 text-gold-dark md:hidden font-bold text-xs uppercase">Protocolo Elysium</div>
                  <div className="flex items-center gap-3 font-semibold text-deep-green">
                    <Check className="w-5 h-5 text-teal-700 shrink-0" />
                    <span className="text-sm">{item.protocol}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div className="mt-20 text-center">
            <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-gold/40 to-deep-green/20">
                <div className="bg-[#FAF9F6] px-10 py-10 rounded-xl">
                    <h4 className="font-heading font-bold text-2xl text-deep-green mb-4">Você merece ser sua melhor versão</h4>
                    <p className="font-body text-slate-600 mb-8">Agende hoje uma avaliação e descubra o plano perfeito para seu caso.</p>
                    <a href="/contato?source=implante" className="btn-gold px-12 py-4 text-base font-bold shadow-lg">Quero agendar minha avaliação</a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
