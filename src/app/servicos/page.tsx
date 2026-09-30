import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicos } from "@/content/servicos";
import { pageMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/ContactSection";
import Icon from "@/components/Icon";

export const metadata = pageMeta({
  title: "Serviços: Diagnóstico, Treinamentos e NR-1",
  description: "Diagnóstico psicossocial, treinamentos de lideranças, implantação de programas e adequação à NR-1, e consultoria mensal com indicadores.",
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
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {servicos.map((s, i) => (
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
        </div>
      </section>
      <ContactSection origem="servicos" />
    </>
  );
}
