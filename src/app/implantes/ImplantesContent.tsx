"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TreatmentsSection } from "@/components/TreatmentsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactCTASection } from "@/components/ContactCTASection";
import { Footer } from "@/components/Footer";
import { ImplantWhyUs } from "@/components/ImplantWhyUs";
import { ProtocolComparison } from "@/components/ProtocolComparison";
import { Sparkles, Zap, Layers, Grid, ArrowRight } from "lucide-react";

const implantTreatments = [
  {
    id: "unitario",
    icon: Sparkles,
    title: "Implante Unitário",
    subtitle: "Harmonia Total",
    description: "Recupere um dente perdido com um implante que se integra perfeitamente à sua arcada, devolvendo a função e a estética de forma definitiva.",
    benefits: ["Estética natural", "Preserva os dentes vizinhos", "Função mastigatória plena"],
    accent: "#CBB27A",
  },
  {
    id: "protocolo",
    icon: Grid,
    title: "Prótese Protocolo",
    subtitle: "Sorriso Fixo e Seguro",
    description: "Um sorriso fixo e completo sobre implantes. A solução definitiva para quem busca o fim da dentadura e total segurança ao falar e comer.",
    benefits: ["Fixo e estável", "Sem céu da boca", "Transformação completa"],
    accent: "#8E6F3A",
  },
  {
    id: "carga-imediata",
    icon: Zap,
    title: "Carga Imediata",
    subtitle: "Sorriso no mesmo dia",
    description: "Dependendo da avaliação óssea, você pode sair da cirurgia já com seus dentes provisórios fixados. Agilidade e autoestima imediata.",
    benefits: ["Dentes no mesmo dia", "Menos tempo de espera", "Recuperação acelerada"],
    accent: "#F3E6C2",
  },
  {
    id: "enxerto",
    icon: Layers,
    title: "Enxerto Ósseo",
    subtitle: "Base Sólida",
    description: "Utilizamos as técnicas mais avançadas para reconstruir a estrutura óssea necessária, permitindo que qualquer paciente receba seus implantes.",
    benefits: ["Segurança cirúrgica", "Materiais biocompatíveis", "Alta previsibilidade"],
    accent: "#CBB27A",
  },
];

const implantSteps = [
  {
    number: "01",
    title: "Tomografia 3D",
    description: "Realizamos um diagnóstico por imagem de alta precisão para mapear sua estrutura óssea e planejar cada detalhe com segurança.",
  },
  {
    number: "02",
    title: "Planejamento Virtual",
    description: "Simulamos a cirurgia digitalmente por meio de softwares avançados, garantindo precisão milimétrica e previsibilidade.",
  },
  {
    number: "03",
    title: "Cirurgia Guiada",
    description: "Procedimento minimamente invasivo, muitas vezes sem a necessidade de cortes ou pontos, acelerando drasticamente a cicatrização.",
  },
  {
    number: "04",
    title: "Novo Sorriso Fixo",
    description: "Instalação da prótese que devolve 100% da sua força de mastigação e a confiança máxima para sorrir e viver.",
  },
];

const implantFaqs = [
  {
    id: "faq-1",
    q: "O implante dentário dói?",
    a: "Não. A cirurgia é realizada sob anestesia local e, com as técnicas de cirurgia guiada que utilizamos, o trauma nos tecidos é mínimo. A maioria dos pacientes relata apenas um leve desconforto no pós-operatório.",
  },
  {
    id: "faq-2",
    q: "Quanto tempo dura a recuperação?",
    a: "Com a técnica minimamente invasiva, a maioria dos pacientes retorna às suas atividades normais em 24h a 48h. A integração total do implante ao osso leva alguns meses, mas você não fica sem dentes nesse período.",
  },
  {
    id: "faq-3",
    q: "Eu fumo, posso fazer implantes?",
    a: "Sim, fumantes podem fazer implantes, mas os riscos de falha são maiores devido à cicatrização mais lenta. Realizamos uma avaliação rigorosa para garantir a viabilidade e segurança do seu tratamento.",
  },
  {
    id: "faq-4",
    q: "Qual a diferença entre Protocolo e Dentadura?",
    a: "A dentadura é removível e muitas vezes instável. O Protocolo é uma prótese fixa sobre implantes, não possui o 'céu da boca' e devolve a firmeza total ao se alimentar e falar.",
  },
];

export function ImplantesContent() {
  return (
    <>
      <Navbar ctaHref="/contato?source=implante" />
      <main>
        <HeroSection
          badgeText="Especialistas em Implantes"
          title={
            <>
              Seu sorriso completo novamente com <em className="not-italic text-gold-dark">implantes premium</em>
            </>
          }
          subtitle="Transformação segura, duradoura e com a tecnologia estética mais avançada para devolver sua saúde e autoestima."
          checks={[
            "Implantes de carga imediata — rapidez e função",
            "Técnica de cirurgia guiada sem cortes",
            "Protocolo Prótese Protocolo para arcada completa",
          ]}
          primaryCtaText={
            <span className="flex items-center gap-2">
              Agendar Avaliação de Implante <ArrowRight className="w-5 h-5" />
            </span>
          }
          primaryCtaHref="/contato?source=implante"
          imageSrc="/Antes e depois (rosto)/rosto-antes-1.jpg"
          imageLabel="Autoestima recuperada"
          imageSublabel="Implantes de Alta Performance — Elysium"
        />

        <ImplantWhyUs />

        <TreatmentsSection
          badgeText="Soluções em Implantes"
          title={
            <>
              Tecnologia a serviço da sua <em className="not-italic" style={{ color: "#8E6F3A" }}>qualidade de vida</em>
            </>
          }
          description="Utilizamos os melhores sistemas de implantes do mundo para garantir resultados vitalícios, confortáveis e esteticamente perfeitos."
          treatments={implantTreatments}
        />

        <ProcessSection
          badgeText="A Jornada do Implante"
          title={
            <>
              Do planejamento digital ao <em className="not-italic" style={{ color: "#8E6F3A" }}>sorriso fixo</em>
            </>
          }
          steps={implantSteps}
        />

        <ProtocolComparison />

        <FaqSection
          badgeText="Tudo sobre Implantes"
          title={
            <>
              Esclareça suas dúvidas sobre <em className="not-italic" style={{ color: "#8E6F3A" }}>implantes dentários</em>
            </>
          }
          faqs={implantFaqs}
        />
        
        <ContactCTASection ctaHref="/contato?source=implante" />
      </main>
      <Footer />
    </>
  );
}
