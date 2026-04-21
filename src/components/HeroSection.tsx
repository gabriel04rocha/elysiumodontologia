"use client";

import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  badgeText?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  checks?: string[];
  primaryCtaText?: React.ReactNode;
  primaryCtaHref?: string;
  secondaryCtaText?: React.ReactNode;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageLabel?: string;
  imageSublabel?: string;
}

export function HeroSection({
  badgeText = "Odontologia Estética Avançada",
  title,
  subtitle,
  checks = [
    "Facetas de Resina — seu sorriso novo em um único dia",
    "Lentes de Porcelana para máxima sofisticação",
    "Planejamento digital com simulação prévia",
  ],
  primaryCtaText = "Quero meu sorriso novo",
  primaryCtaHref = "/contato?source=geral",
  secondaryCtaText = "Ver resultados",
  secondaryCtaHref = "#resultados",
  imageSrc = "/Antes e depois (rosto)/rosto-antes-1.jpg",
  imageAlt = "Paciente feliz após tratamento na Elysium Odontologia",
  imageLabel = "Sorriso transformado",
  imageSublabel = "Facetas de Resina — Elysium",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
      style={{
        background: "radial-gradient(circle at top right, #123531 0%, #0E2A26 60%, #071715 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(203, 178, 122, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(203, 178, 122, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(203,178,122,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(203,178,122,0.3) 1px, transparent 1px)",
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
                src="/Logos/logo-icon-gold.png"
                alt="Elysium Odontologia"
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="text-xs font-body font-semibold text-white/80 tracking-wide uppercase">
                {badgeText}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-premium font-extrabold text-white mb-6 leading-[1.1] tracking-tight normal-case"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              {title || (
                <>
                  Seu sorriso,{" "}
                  <em className="not-italic font-light text-gold-light">perfeito</em>
                  <br />
                  como você sempre <em className="not-italic text-gold">sonhou</em>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-white/70 leading-relaxed mb-8 max-w-lg"
              style={{ fontSize: "1.05rem" }}
            >
              {subtitle || (
                <>
                  Na Elysium Odontologia somos especialistas em transformar sorrisos com{" "}
                  <strong className="text-white/90">Facetas de Resina</strong> de alta
                  performance e Porcelana, unindo tecnologia e arte para um
                  resultado natural e imediato.
                </>
              )}
            </motion.p>

            {/* Checks */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-2.5 mb-10"
            >
              {checks.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-gold" />
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
                href={primaryCtaHref}
                className="btn-gold px-8 py-3.5 text-base font-bold"
              >
                {primaryCtaText}
              </a>
              <a
                id="hero-cta-secondary"
                href={secondaryCtaHref}
                className="btn-outline-gold px-8 py-3.5 text-base font-semibold"
              >
                {secondaryCtaText}
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
              style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.4)" }}
            >
              <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
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
                    background: "linear-gradient(transparent, rgba(7,23,21,0.9))",
                  }}
                >
                  <p className="font-heading text-white text-lg font-semibold">
                    {imageLabel}
                  </p>
                  <p className="font-body text-white/65 text-xs mt-0.5">
                    {imageSublabel}
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

