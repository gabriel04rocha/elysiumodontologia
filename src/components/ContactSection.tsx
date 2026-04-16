"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

const infoItems = [
  {
    icon: Mail,
    label: "E-mail",
    value: "elysiumodonto@gmail.com",
    href: "mailto:elysiumodonto@gmail.com",
  },
  {
    icon: MapPin,
    label: "Endereço",
    value: "St. Central EQ 47/49 Ed. Life Gama",
    href: "#",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg–Sex 07h–19h | Sáb 07h–12h",
    href: "#",
  },
];

export function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // URL do webhook vinda do .env
      const webhookUrl = `${process.env.NEXT_PUBLIC_WEBHOOK_URL}/submit`;
      
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.msg
        }),
      });

      if (!res.ok) throw new Error("Erro ao enviar");

      setSent(true);
    } catch (err) {
      console.error("Erro no formulário:", err);
      // Aqui podemos colocar um alerta mais amigável, mas o alert simples serve por enquanto
      alert("Houve um erro de conexão. Verifique a sua internet ou tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contato"
      className="section-pad relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #223d4a 0%, #375c6d 50%, #2d9f99 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(65,193,187,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-60px] left-[-80px] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-body font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: "#6dd3ce" }}
            >
              Entre em Contato
            </p>
            <h2
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Agende sua avaliação
              <br />
              <em className="not-italic" style={{ color: "#41c1bb" }}>
                gratuita
              </em>
            </h2>
            <p className="font-body text-white/70 text-sm leading-relaxed mb-10 max-w-md">
              Nossa equipe está pronta para entender o seu caso e apresentar as
              melhores opções para o seu sorriso. Sem compromisso.
            </p>

            {/* Info items */}
            <div className="flex flex-col gap-5">
              {infoItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: "rgba(65,193,187,0.15)",
                        border: "1px solid rgba(65,193,187,0.25)",
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: "#41c1bb" }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-body text-white/50 mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-body text-sm text-white/85 group-hover:text-white transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right – form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-3xl p-8 lg:p-10"
            style={{
              boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
            }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
                <CheckCircle2
                  className="w-16 h-16"
                  style={{ color: "#41c1bb" }}
                />
                <h3 className="font-heading text-white text-2xl font-semibold">
                  Mensagem enviada!
                </h3>
                <p className="font-body text-white/65 text-sm max-w-xs">
                  Em breve nossa equipe entrará em contato para confirmar seu
                  agendamento. Obrigado!
                </p>
              </div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <h3 className="font-heading text-white text-2xl font-semibold mb-1">
                  Solicite sua avaliação
                </h3>
                <p className="font-body text-white/55 text-xs mb-2">
                  Preencha os campos abaixo e entraremos em contato em até 24h.
                </p>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-body font-medium text-white/60 uppercase tracking-wide"
                  >
                    Nome completo
                  </label>
                  <input
                    id="contact-name"
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
                    <label
                      htmlFor="contact-phone"
                      className="text-xs font-body font-medium text-white/60 uppercase tracking-wide"
                    >
                      WhatsApp
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="(00) 00000-0000"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-xl px-4 py-3 text-sm font-body bg-white/10 text-white placeholder-white/35 outline-none border border-white/15 focus:border-[#41c1bb] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-body font-medium text-white/60 uppercase tracking-wide"
                    >
                      E-mail
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-xl px-4 py-3 text-sm font-body bg-white/10 text-white placeholder-white/35 outline-none border border-white/15 focus:border-[#41c1bb] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-msg"
                    className="text-xs font-body font-medium text-white/60 uppercase tracking-wide"
                  >
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={3}
                    placeholder="Conte um pouco sobre seu caso..."
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm font-body bg-white/10 text-white placeholder-white/35 outline-none border border-white/15 focus:border-[#41c1bb] transition-colors resize-none"
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-teal py-4 text-sm font-semibold mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "Agendar avaliação gratuita →"}
                </button>

                <p className="text-center text-white/35 text-xs font-body">
                  Seus dados são tratados com total sigilo e privacidade.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
