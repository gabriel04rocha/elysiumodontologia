import { Metadata } from "next";
import { ImplantesContent } from "./ImplantesContent";

export const metadata: Metadata = {
  title: "Implantes Dentários Premium | Elysium Odontologia",
  description: "Recupere sua confiança e qualidade de vida com implantes dentários de alta tecnologia. Cirurgia guiada, carga imediata e resultados vitalícios.",
  keywords: ["implantes dentários", "protocolo all-on-4", "carga imediata", "cirurgia guiada", "Elysium Odontologia", "implante sem cortes"],
};

export default function ImplantesPage() {
  return <ImplantesContent />;
}
