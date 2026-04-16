"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone } from "lucide-react";
import Image from "next/image";

function IconInstagram({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.01" stroke="none" fill="currentColor" strokeWidth="3"/>
    </svg>
  );
}

function IconFacebook({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

const footerLinks = {
  "Mapa do Site": ["Início", "Sobre nós", "Tratamentos", "Depoimentos"],
  "Atendimento": ["Segunda a Sexta: 07h às 19h", "Sábado: 07h às 12h", "Domingo: Fechado"],
  "Endereço": ["St. Central EQ 47/49 Edifício Life Gama", "Gama, Brasília - DF", "CEP: 72405-470"],
};

export function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #1a2f38 0%, #0f1e25 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top CTA strip */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-b"
          style={{ borderColor: "rgba(65,193,187,0.15)" }}
        >
          <p className="font-heading text-white text-xl font-semibold">
            Pronto para transformar seu sorriso?
          </p>
          <a
            id="footer-cta"
            href="/contato"
            className="btn-teal px-8 py-3 text-sm font-semibold flex-shrink-0"
          >
            Agendar agora
          </a>
        </motion.div>

        {/* Main footer */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <a href="/">
              <Image
                src="/Logos/logo-light-clean.png"
                alt="Elysium Odontologia"
                width={180}
                height={42}
                style={{ display: "block" }}
              />
            </a>
            <p className="font-body text-sm text-white/50 leading-relaxed">
              Referência em odontologia de excelência no Gama - DF. Transformamos
              sorrisos com arte, ciência e cuidado.
            </p>
            <div className="flex gap-3">
              <a
                id="social-instagram"
                href="https://www.instagram.com/elysiumodontologia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
                style={{
                  background: "rgba(65,193,187,0.12)",
                  border: "1px solid rgba(65,193,187,0.2)",
                }}
              >
                <IconInstagram className="w-4 h-4" style={{ color: "#41c1bb" }} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <p
                className="text-xs font-body font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#41c1bb" }}
              >
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={category === "Mapa do Site" ? `#` : undefined}
                      className={`font-body text-sm text-white/50 transition-colors ${category === "Mapa do Site" ? "hover:text-white/80" : "cursor-default pointer-events-none"}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 py-6 border-t"
          style={{ borderColor: "rgba(65,193,187,0.1)" }}
        >
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} Elysium Odontologia. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-white/25">
            Desenvolvido por{" "}
            <a href="https://insiteweb.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">
              Insite Web
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
