"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WEBHOOK_SERVER_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || "https://api.elysiumodontologia.com.br";

export default function ContatoPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${WEBHOOK_SERVER_URL}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao enviar. Tente novamente.");
      }

      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #223d4a 0%, #375c6d 50%, #2d9f99 100%)" }}
    >
      {/* Blobs ambiente */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(65,193,187,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 lg:py-16">
        {/* Topo — logo + voltar */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <Image
            src="/Logos/logo-light-clean.png"
            alt="Elysium Odontologia"
            width={200}
            height={47}
            style={{ display: "block" }}
            priority
          />

          {/* Espaçador para centralizar a logo */}
          <div className="w-16" />
        </div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Esquerda — texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-body font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: "#6dd3ce" }}
            >
              Entre em Contato
            </p>
            <h1
              className="font-heading font-bold text-white mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Agende sua avaliação{" "}
              <em className="not-italic" style={{ color: "#41c1bb" }}>
                gratuita
              </em>
            </h1>
            <p className="font-body text-white/70 text-sm leading-relaxed mb-10 max-w-md">
              Preencha o formulário e nossa equipe entrará em contato em até{" "}
              <strong className="text-white/90">24 horas</strong> para confirmar
              seu agendamento personalizado.
            </p>

            <div className="flex flex-col gap-6">
               <div className="p-6 rounded-2xl glass-teal border border-white/10">
                  <p className="text-sm font-body text-white/80 leading-relaxed">
                    Estamos prontos para transformar seu sorriso com tecnologia de ponta e as melhores lentes dentárias do mercado. Aguardamos sua mensagem.
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Direita — Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-3xl p-8 lg:p-10"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                <CheckCircle2 className="w-16 h-16" style={{ color: "#41c1bb" }} />
                <h2 className="font-heading text-white text-2xl font-semibold">
                  Solicitação enviada!
                </h2>
                <p className="font-body text-white/65 text-sm max-w-xs">
                  Em breve nossa equipe entrará em contato para confirmar seu
                  agendamento. Obrigado!
                </p>
                <Link
                  href="/"
                  className="btn-teal mt-4 px-8 py-3 text-sm font-semibold inline-block"
                >
                  Voltar ao início
                </Link>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h2 className="font-heading text-white text-2xl font-semibold mb-1">
                    Solicite sua avaliação
                  </h2>
                  <p className="font-body text-white/50 text-xs">
                    Todos os campos marcados com * são obrigatórios.
                  </p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-name" className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide">
                    Nome completo *
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm font-body bg-white/10 text-white placeholder-white/35 outline-none border border-white/15 focus:border-[#41c1bb] transition-colors"
                  />
                </div>

                {/* Phone + email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="f-phone" className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide">
                      WhatsApp *
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      required
                      placeholder="(00) 00000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm font-body bg-white/10 text-white placeholder-white/35 outline-none border border-white/15 focus:border-[#41c1bb] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="f-email" className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide">
                      E-mail
                    </label>
                    <input
                      id="f-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm font-body bg-white/10 text-white placeholder-white/35 outline-none border border-white/15 focus:border-[#41c1bb] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-message" className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="f-message"
                    rows={4}
                    placeholder="Conte um pouco sobre seu caso ou a melhor forma de te contatar..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm font-body bg-white/10 text-white placeholder-white/35 outline-none border border-white/15 focus:border-[#41c1bb] transition-colors resize-none"
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-red-300 text-xs font-body bg-red-900/20 rounded-lg px-4 py-2">
                    ⚠ {error}
                  </p>
                )}

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-teal py-4 text-sm font-semibold mt-1 disabled:opacity-60 disabled:cursor-not-allowed w-full"
                >
                  {loading ? "Enviando..." : "Agendar avaliação gratuita →"}
                </button>

                <p className="text-center text-white/30 text-xs font-body">
                  Seus dados são tratados com total sigilo e privacidade.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
