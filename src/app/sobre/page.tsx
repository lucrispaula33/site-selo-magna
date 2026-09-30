import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import ImageSlot from "@/components/ImageSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/ContactSection";
import { Differentials, MissionVisionValues, SeloMeaning, TeamGrid, TrustBar } from "@/components/Sections";

export const metadata = pageMeta({
  title: "Sobre a Selo Magna: Liderança e Organização Saudável",
  description: "Conheça a Selo Magna: estratégia, rigor técnico e cuidado com pessoas. Equipe multidisciplinar em psicologia organizacional, segurança do trabalho e liderança.",
  path: "/sobre",
});

export default function Sobre() {
  return (
    <>
      <section className="pb-20 pt-10 md:pt-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Sobre", href: "/sobre" }]} />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Sobre a consultoria</p>
              <h1 className="mt-5 text-5xl leading-[1.05] md:text-6xl">Estratégia, rigor técnico e cuidado com pessoas — no mesmo lugar.</h1>
              <p className="lead mt-7">
                A {site.fullName} nasce para integrar a estratégia do negócio à saúde mental corporativa. Tratamos o capital humano com o
                rigor técnico de uma auditoria: diagnóstico preciso, indicadores claros, planos de ação personalizados e acompanhamento contínuo.
              </p>
              <p className="lead mt-5">
                Nosso público-alvo são diretores e gestores de RH de empresas médias e grandes — especialmente organizações com alta
                rotatividade ou absenteísmo, alto risco de clima e empresas que buscam certificações.
              </p>
            </div>
            <ImageSlot src={site.images.about} alt="Consultora e gestor analisando um relatório de indicadores" className="aspect-[4/3]" priority />
          </div>
        </div>
      </section>
      <TrustBar />
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl">Quem trabalha na {site.name}</h2>
          <p className="lead mt-4">Um time multidisciplinar que cobre todas as frentes da organização saudável.</p>
          <div className="mt-10"><TeamGrid tone="cream" /></div>
        </div>
      </section>
      <section className="section">
        <div className="container"><SeloMeaning /></div>
        <div className="container mt-14"><MissionVisionValues /></div>
      </section>
      <section className="section pt-0">
        <div className="container">
          <h2 className="text-4xl md:text-5xl">Nossos diferenciais</h2>
          <div className="mt-10"><Differentials /></div>
          <div className="mt-14 rounded-3xl border border-areia-300/70 bg-white p-8 md:p-10">
            <h3 className="text-2xl">Compromisso ético</h3>
            <p className="mt-3 leading-relaxed text-slate-600">
              Seguimos o Código de Ética Profissional do Psicólogo: autonomia técnica, sigilo e confidencialidade. A empresa recebe dados
              agregados e anonimizados; informações individuais de saúde nunca são compartilhadas. Tratamos dados pessoais conforme a LGPD.
            </p>
          </div>
        </div>
      </section>
      <ContactSection origem="sobre" />
    </>
  );
}
