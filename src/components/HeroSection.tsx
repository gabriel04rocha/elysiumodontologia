"use client";

import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
      style={{
        background: "linear-gradient(135deg, #223d4a 0%, #375c6d 48%, #2d9f99 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(65,193,187,0.22) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(55,92,109,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 lg:pt-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – copy */}
          <div>
            {/* Logo badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 glass rounded-full px-4 py-2 mb-6"
            >
              <Image
                src="/Logos/logo-icone-light.png"
                alt="Elysium Odontologia"
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-xs font-body font-medium text-white/80 tracking-wide">
                Odontologia Estética Avançada
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              Seu sorriso,{" "}
              <em className="not-italic font-light" style={{ color: "#6dd3ce" }}>
                perfeito
              </em>
              <br />
              como você sempre{" "}
              <em className="not-italic" style={{ color: "#41c1bb" }}>
                sonhou
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-white/70 leading-relaxed mb-8 max-w-lg"
              style={{ fontSize: "1.05rem" }}
            >
              Na Elysium Odontologia combinamos{" "}
              <strong className="text-white/90">tecnologia de ponta</strong> e
              uma visão artística única para criar lentes e facetas dentárias que
              transformam sorrisos de forma natural e duradoura.
            </motion.p>

            {/* Checks */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-2.5 mb-10"
            >
              {[
                "Ultrafinas — sem desgaste dental excessivo",
                "Resultado imediato e duradouro (10–20 anos)",
                "Planejamento digital com simulação prévia",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#41c1bb" }} />
                  <span className="text-sm font-body text-white/80">{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                id="hero-cta-primary"
                href="/contato"
                className="btn-teal px-8 py-3.5 text-base font-semibold"
              >
                Quero meu sorriso novo
              </a>
              <a
                id="hero-cta-secondary"
                href="#resultados"
                className="btn-outline-white px-8 py-3.5 text-base"
              >
                Ver resultados
              </a>
            </motion.div>
          </div>

          {/* Right – foto de resultado real */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="hidden lg:flex flex-col items-center gap-5"
          >
            <div
              className="glass rounded-3xl overflow-hidden w-full max-w-sm"
              style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.25)" }}
            >
              <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                <Image
                  src="/Antes e depois (rosto)/rosto-antes-1.jpg"
                  alt="Paciente feliz após tratamento na Elysium Odontologia"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                  priority
                  loading="eager"
                  sizes="400px"
                />
                {/* Overlay com label */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{
                    background: "linear-gradient(transparent, rgba(22,44,55,0.85))",
                  }}
                >
                  <p className="font-heading text-white text-lg font-semibold">
                    Sorriso transformado
                  </p>
                  <p className="font-body text-white/65 text-xs mt-0.5">
                    Lentes de Contato Dental — Elysium
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#tratamentos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-xs font-body tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}
