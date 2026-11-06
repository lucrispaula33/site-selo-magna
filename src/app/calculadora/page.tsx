import { pageMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Calculator from "@/components/Calculator";
import ContactSection from "@/components/ContactSection";

export const metadata = pageMeta({
  title: "Calculadora do Custo Evitável com Pessoas",
  description: "Compare turnover, faltas, afastamentos e engajamento da sua empresa com referências publicadas e veja o custo evitável por ano. Gratuito.",
  path: "/calculadora",
});

export default function Calculadora() {
  return (
    <>
      <section className="pb-20 pt-10 md:pt-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Calculadora", href: "/calculadora" }]} />
          <p className="eyebrow mt-8">Calculadora Selo Magna</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] md:text-6xl">Quanto do custo com pessoas está acima do que seria saudável?</h1>
          <p className="lead mt-6 max-w-2xl">Informe os números reais da empresa. A calculadora compara cada indicador com uma referência publicada e mostra só a diferença: o custo evitável. Se os indicadores estiverem dentro da referência, o resultado diz isso.</p>
          <div className="mt-12"><Calculator /></div>
        </div>
      </section>
      <ContactSection title="Transforme a estimativa em um diagnóstico real" origem="calculadora" defaultChallenge="Ainda não sei, quero um diagnóstico" />
    </>
  );
}
