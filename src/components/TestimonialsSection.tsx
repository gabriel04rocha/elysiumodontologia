"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: "t1",
    name: "Mariana Costa",
    role: "Empresária",
    stars: 5,
    text: "Fiz as lentes de contato dental na Elysium e o resultado superou todas as minhas expectativas. O atendimento é extremamente cuidadoso e personalizado. Em apenas 2 sessões saí com o sorriso que sempre sonhei!",
    initial: "M",
  },
  {
    id: "t2",
    name: "Rodrigo Almeida",
    role: "Arquiteto",
    stars: 5,
    text: "A simulação digital foi o que me convenceu. Ver meu sorriso antes mesmo de começar o tratamento foi incrível. As facetas ficaram absolutamente naturais — minha família nem percebeu que eram facetas!",
    initial: "R",
  },
  {
    id: "t3",
    name: "Fernanda Lima",
    role: "Professora",
    stars: 5,
    text: "Tinha muito medo de dentista, mas a equipe da Elysium me acolheu de um jeito que nunca tinha visto. Fiz clareamento e lentes — a transformação foi impressionante. Me devolveram a autoestima!",
    initial: "F",
  },
  {
    id: "t4",
    name: "Carlos Eduardo",
    role: "Médico",
    stars: 5,
    text: "Como profissional da saúde, prezei muito pela ética e técnica da equipe. O resultado das minhas facetas é impecável. Dentes com aparência totalmente natural e cor perfeita. Recomendo sem hesitar.",
    initial: "C",
  },
];

const avatarColors = [
  "linear-gradient(135deg, #8E6F3A, #CBB27A)",
  "linear-gradient(135deg, #CBB27A, #F3E6C2)",
  "linear-gradient(135deg, #8E6F3A, #F3E6C2)",
  "linear-gradient(135deg, #CBB27A, #8E6F3A)",
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      id={`testimonial-${testimonial.id}`}
      className="hover-lift bg-white rounded-3xl p-8 flex flex-col gap-5 relative"
      style={{
        boxShadow: "0 12px 32px rgba(203, 178, 122, 0.12)",
        border: "1px solid rgba(203, 178, 122, 0.15)",
      }}
    >
      {/* Quote icon */}
      <Quote
        className="w-8 h-8 absolute top-6 right-6 opacity-10"
        style={{ color: "#CBB27A" }}
      />

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-current"
            style={{ color: "#CBB27A" }}
          />
        ))}
      </div>

      {/* Text */}
      <p className="font-body text-sm text-[#2D4D59]/80 leading-relaxed flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "rgba(142, 111, 58, 0.1)" }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: avatarColors[index % avatarColors.length] }}
        >
          <span className="text-white font-semibold text-sm">
            {testimonial.initial}
          </span>
        </div>
        <div>
          <p className="font-body font-bold text-sm text-[#0E2A26]">
            {testimonial.name}
          </p>
          <p className="font-body text-xs text-[#2D4D59]/60">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="depoimentos"
      className="section-pad relative overflow-hidden"
      style={{
        background: "#FAF9F6",
      }}
    >
      {/* Blob */}
      <div
        className="absolute left-[-100px] bottom-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(203, 178, 122, 0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-body font-bold uppercase tracking-[0.22em] mb-4"
            style={{ color: "#8E6F3A" }}
          >
            Depoimentos
          </p>
          <h2
            className="font-heading font-bold mb-6 text-[#0E2A26]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            O que nossos pacientes
            <br />
            <em className="not-italic" style={{ color: "#8E6F3A" }}>
              estão dizendo
            </em>
          </h2>
          <span className="divider-gold mx-auto block" />
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
