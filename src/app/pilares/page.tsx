import { pageMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/ContactSection";
import { CostSilence, PillarsGrid } from "@/components/Sections";

export const metadata = pageMeta({
  title: "7 Pilares: Riscos Psicossociais e Seus Custos",
  description: "Burnout, absenteísmo, turnover, PGR, assédio, engajamento e treinamento: veja quanto cada problema custa para uma empresa de 100 pessoas e como resolver.",
  path: "/pilares",
});

export default function Pilares() {
  return (
    <>
      <section className="pb-14 pt-10 md:pt-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Pilares", href: "/pilares" }]} />
          <h1 className="mt-8 max-w-4xl text-5xl leading-[1.05] md:text-6xl">Os 7 riscos invisíveis que consomem os resultados da sua empresa.</h1>
          <p className="lead mt-6 max-w-2xl">Cada pilar mostra os sinais de alerta, o custo estimado para uma empresa de até 100 colaboradores com 35% de turnover e como a Selo Magna atua.</p>
        </div>
      </section>
      <PillarsGrid title="Escolha o desafio mais urgente para a sua empresa." />
      <CostSilence />
      <ContactSection origem="pilares" />
    </>
  );
}
