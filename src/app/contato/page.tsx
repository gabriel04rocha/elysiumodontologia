"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WEBHOOK_SERVER_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || "http://localhost:3000";

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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 lg:py-16">
        {/* Topo — logo + voltar */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a página principal
          </Link>

          <Image
            src="/Logos/logo-light-clean.png"
            alt="Elysium Odontologia"
            width={240}
            height={56}
            className="w-auto h-12 lg:h-14"
            priority
          />
        </div>

        {/* Conteúdo Centralizado */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p
              className="text-xs font-body font-semibold uppercase tracking-[0.25em] mb-4"
              style={{ color: "#6dd3ce" }}
            >
              Exclusividade & Estética
            </p>
            <h1
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Agende sua avaliação{" "}
              <em className="not-italic" style={{ color: "#41c1bb" }}>
                personalizada
              </em>
            </h1>
            <p className="font-body text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
              Preencha o formulário abaixo e nossa equipe entrará em contato em até{" "}
              <strong className="text-white">24 horas</strong> para agendar seu horário com nossos especialistas.
            </p>
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-[32px] p-8 lg:p-12 w-full max-w-xl"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.3)" }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-teal/10 border border-teal/20 mb-2">
                  <CheckCircle2 className="w-10 h-10" style={{ color: "#41c1bb" }} />
                </div>
                <h2 className="font-heading text-white text-3xl font-semibold">
                  Solicitação Recebida
                </h2>
                <p className="font-body text-white/65 text-base max-w-xs mx-auto">
                  Agradecemos a confiança. Em breve entraremos em contato para confirmar sua avaliação exclusiva.
                </p>
                <Link
                  href="/"
                  className="btn-teal mt-6 px-10 py-4 text-sm font-semibold inline-block"
                >
                  Voltar ao início
                </Link>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h2 className="font-heading text-white text-2xl font-semibold mb-2 text-center">
                    Inicie sua transformação
                  </h2>
                  <div className="w-12 h-1 bg-teal mx-auto rounded-full mb-6 opacity-40" />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-name" className="text-[10px] font-body font-bold text-white/40 uppercase tracking-widest ml-1">
                    Nome completo *
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    required
                    placeholder="Como gostaria de ser chamado(a)?"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-2xl px-5 py-4 text-sm font-body bg-white/[0.05] text-white placeholder-white/20 outline-none border border-white/10 focus:border-[#41c1bb] focus:bg-white/[0.08] transition-all"
                  />
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-phone" className="text-[10px] font-body font-bold text-white/40 uppercase tracking-widest ml-1">
                    WhatsApp para contato *
                  </label>
                  <input
                    id="f-phone"
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-2xl px-5 py-4 text-sm font-body bg-white/[0.05] text-white placeholder-white/20 outline-none border border-white/10 focus:border-[#41c1bb] focus:bg-white/[0.08] transition-all"
                  />
                </div>

                {/* E-mail */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-email" className="text-[10px] font-body font-bold text-white/40 uppercase tracking-widest ml-1">
                    E-mail (opcional)
                  </label>
                  <input
                    id="f-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-2xl px-5 py-4 text-sm font-body bg-white/[0.05] text-white placeholder-white/20 outline-none border border-white/10 focus:border-[#41c1bb] focus:bg-white/[0.08] transition-all"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-message" className="text-[10px] font-body font-bold text-white/40 uppercase tracking-widest ml-1">
                    Alguma observação?
                  </label>
                  <textarea
                    id="f-message"
                    rows={4}
                    placeholder="Diga-nos o melhor horário para ligarmos ou tire suas dúvidas..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-2xl px-5 py-4 text-sm font-body bg-white/[0.05] text-white placeholder-white/20 outline-none border border-white/10 focus:border-[#41c1bb] focus:bg-white/[0.08] transition-all resize-none"
                  />
                </div>

                {/* Error */}
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-300 text-xs font-body bg-red-900/30 rounded-xl px-4 py-3 border border-red-500/20"
                  >
                    ⚠ {error}
                  </motion.p>
                )}

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-teal py-5 text-sm font-bold mt-4 disabled:opacity-60 disabled:cursor-not-allowed w-full shadow-2xl shadow-teal/30"
                >
                  {loading ? "Processando..." : "Solicitar Agendamento Individual →"}
                </button>

                <p className="text-center text-white/25 text-[10px] font-body tracking-wider uppercase mt-2">
                  Privacidade garantida • Elysium Odontologia
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
