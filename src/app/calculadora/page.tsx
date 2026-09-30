import { pageMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Calculator from "@/components/Calculator";
import ContactSection from "@/components/ContactSection";

export const metadata = pageMeta({
  title: "Calculadora do Custo Oculto da Saúde Mental",
  description: "Calcule em 30 segundos quanto burnout, turnover, absenteísmo e falta de engajamento custam para a sua empresa por ano. Gratuito.",
  path: "/calculadora",
});

export default function Calculadora() {
  return (
    <>
      <section className="pb-20 pt-10 md:pt-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Calculadora", href: "/calculadora" }]} />
          <p className="eyebrow mt-8">O custo do silêncio</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] md:text-6xl">Quanto a sua empresa perde por ano sem perceber?</h1>
          <p className="lead mt-6 max-w-2xl">Ajuste os dados abaixo e veja a estimativa dos sete custos ocultos mapeados pela Selo Magna.</p>
          <div className="mt-12"><Calculator /></div>
        </div>
      </section>
      <ContactSection title="Transforme a estimativa em um diagnóstico real" origem="calculadora" defaultChallenge="Ainda não sei — quero um diagnóstico" />
    </>
  );
}
