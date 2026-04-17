"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function ContactCTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="contato"
      className="section-pad relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #071715 0%, #0E2A26 50%, #123531 100%)",
      }}
    >
      {/* Blobs */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(203, 178, 122, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-body font-bold uppercase tracking-[0.22em] mb-4"
            style={{ color: "#F3E6C2" }}
          >
            Comece sua transformação
          </p>
          <h2
            className="font-heading font-bold text-white mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Agende sua consulta
            <br />
            <em className="not-italic" style={{ color: "#CBB27A" }}>
              gratuita agora
            </em>
          </h2>
          <p className="font-body text-white/70 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Nossa equipe está pronta para entender o seu caso, apresentar as
            melhores opções e mostrar como será seu novo sorriso — sem compromisso.
          </p>

          <a
            id="contact-section-cta"
            href="/contato"
            className="btn-gold inline-block px-12 py-4 text-lg font-bold mb-12"
          >
            Quero agendar minha avaliação →
          </a>

          {/* Info rápida */}
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {[
              { icon: Mail, text: "elysiumodonto@gmail.com", href: "mailto:elysiumodonto@gmail.com" },
              { icon: MapPin, text: "St. Central EQ 47/49 Edifício Life Gama - Gama", href: "#" },
              { icon: Clock, text: "Seg–Sex 07:00–19:00 | Sáb 07:00–12:00", href: "#" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-2 font-body text-sm text-gold-light/60 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: "#CBB27A" }} />
                  {item.text}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
