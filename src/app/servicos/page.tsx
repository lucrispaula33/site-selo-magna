import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicosPrincipais, servicosAdicionais } from "@/content/servicos";
import { pageMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/ContactSection";
import Icon from "@/components/Icon"; import ImageSlot from "@/components/ImageSlot";

export const metadata = pageMeta({
  title: "Serviços: Diagnóstico, Treinamentos e NR-1",
  description: "Diagnóstico psicossocial, treinamentos de lideranças, implantação de programas e adequação à NR-1, consultoria mensal com indicadores e mentoria de carreira.",
  path: "/servicos",
});

export default function Servicos() {
  return (
    <>
      <section className="pb-20 pt-10 md:pt-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }]} />
          <h1 className="mt-8 max-w-4xl text-5xl leading-[1.05] md:text-6xl">Soluções completas, do diagnóstico ao acompanhamento contínuo.</h1>
          <p className="lead mt-6 max-w-2xl">Contrate uma etapa ou a jornada completa. Todas as entregas têm indicadores, responsáveis e evidências auditáveis.</p>
          <div className="mt-12 grid items-center gap-10 md:grid-cols-[1.1fr_1fr]"><ImageSlot src="/images/Selo-Magna-Mapa-de-Servicos.png" alt="Mapa de serviços da Selo Magna: diagnóstico psicossocial e plano de ação, inventário para o PGR com segurança do trabalho, Programa Selo Magna, preparação para selos de saúde mental, desenvolvimento de lideranças, mentoria de carreira e liderança, prevenção ao assédio e transição da jornada 5x2" className="aspect-square" sizes="(min-width: 768px) 55vw, 100vw" /><div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-petroleo-500">Mapa de serviços</p><h2 className="mt-3 text-3xl md:text-4xl">Tudo o que fazemos, em um só lugar</h2><p className="mt-4 leading-relaxed text-slate-600">No centro, a Selo Magna. Ao redor, as frentes que a sua empresa pode contratar juntas ou separadas: do diagnóstico psicossocial e do inventário para o PGR, assinados por psicóloga e por profissional de segurança do trabalho, à preparação para selos de saúde mental, desenvolvimento de lideranças, mentoria, prevenção ao assédio e transição para a jornada 5x2.</p><p className="mt-4 leading-relaxed text-slate-600">Você escolhe por onde começar. Nós ajudamos a montar a ordem certa para a realidade da sua empresa.</p><Link href="/contato#formulario" className="mt-6 inline-flex items-center gap-2 font-semibold text-petroleo-500">Agende uma conversa de 30 minutos <ArrowRight className="h-4 w-4" /></Link></div></div><div className="mt-14 grid gap-6 md:grid-cols-2">
            {servicosPrincipais.map((s, i) => (
              <Link key={s.slug} href={`/servicos/${s.slug}`} className="card group flex flex-col transition hover:shadow-suave md:p-10">
                <div className="flex items-center justify-between">
                  <Icon name={s.icon} className="h-9 w-9 text-petroleo-500" />
                  <span className="text-sm text-slate-400">0{i + 1}</span>
                </div>
                <h2 className="mt-6 text-3xl">{s.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-slate-600">{s.summary}</p>
                <p className="mt-5 text-sm text-slate-500">Duração: {s.duration}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-petroleo-500">Ver detalhes <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
          {servicosAdicionais.length > 0 && (
            <>
              <h2 className="mt-20 text-3xl md:text-4xl">Serviços adicionais</h2>
              <p className="mt-3 max-w-2xl text-slate-600">Podem ser contratados separadamente, por profissionais ou pela empresa.</p>
              <div className="mt-8 grid gap-6">
                {servicosAdicionais.map((s) => (
                  <Link key={s.slug} href={`/servicos/${s.slug}`} className="card group flex flex-col gap-6 border-petroleo-300 transition hover:shadow-suave md:flex-row md:items-center md:p-10">
                    <Icon name={s.icon} className="h-10 w-10 shrink-0 text-petroleo-500" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petroleo-500">{s.tag}</p>
                      <h3 className="mt-2 text-3xl">{s.title}</h3>
                      <p className="mt-3 leading-relaxed text-slate-600">{s.summary}</p>
                      <p className="mt-4 text-sm text-slate-500">{s.duration}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 font-semibold text-petroleo-500">Ver detalhes <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <ContactSection origem="servicos" />
    </>
  );
}
