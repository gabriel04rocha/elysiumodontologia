"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Tratamentos",   href: "#tratamentos" },
  { label: "Processo",      href: "#processo" },
  { label: "Resultados",    href: "#resultados" },
  { label: "Depoimentos",   href: "#depoimentos" },
  { label: "FAQ",           href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(35, 62, 74, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(65,193,187,0.18)" : "none",
          padding: scrolled ? "0.6rem 0" : "1.1rem 0",
          transition: "all 0.4s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/#hero" className="select-none">
            <Image
              src="/Logos/logo-light-clean.png"
              alt="Elysium Odontologia"
              width={160}
              height={37}
              style={{ display: "block" }}
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body font-medium text-white/80 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #2d9f99, #6dd3ce)" }}
                />
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              id="nav-cta"
              href="/contato"
              className="btn-teal px-6 py-2.5 text-sm font-semibold inline-block"
            >
              Agendar Consulta
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden text-white p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-10 gap-4"
            style={{ background: "rgba(34, 61, 74, 0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Logo mobile */}
            <div className="absolute top-5 left-6">
              <Image
                src="/Logos/logo-light-clean.png"
                alt="Elysium Odontologia"
                width={140}
                height={33}
                style={{ display: "block" }}
              />
            </div>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-heading text-white border-b py-4"
                style={{ borderColor: "rgba(65,193,187,0.15)" }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="/contato"
              id="mobile-nav-cta"
              onClick={() => setMobileOpen(false)}
              className="btn-teal mt-6 py-4 text-center text-lg font-semibold"
            >
              Agendar Consulta
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
