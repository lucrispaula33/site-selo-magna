import { notFound } from "next/navigation";
import { CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { getServico, servicos } from "@/content/servicos";
import { pageMeta } from "@/lib/seo";
import { site } from "@/config/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/ContactSection";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicos.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const s = getServico((await params).slug);
  return s ? pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/servicos/${s.slug}` }) : {};
}

export default async function ServicoPage({ params }: Props) {
  const s = getServico((await params).slug);
  if (!s) notFound();
  return (
    <>
      <section className="pb-20 pt-10 md:pt-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: s.title, href: `/servicos/${s.slug}` }]} />
          <div className="mt-10 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <Icon name={s.icon} className="h-10 w-10 text-petroleo-500" />
              <h1 className="mt-6 text-5xl leading-[1.05] md:text-6xl">{s.title}</h1>
              <p className="lead mt-6">{s.summary}</p>
              <h2 className="mt-14 text-3xl">O que está incluído</h2>
              <ul className="mt-6 grid gap-3">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 rounded-xl border border-areia-300/70 bg-white p-4 text-slate-700"><CheckCircle2 className="h-5 w-5 shrink-0 text-petroleo-500" aria-hidden="true" />{d}</li>
                ))}
              </ul>
              <h2 className="mt-14 text-3xl">Como funciona</h2>
              <ol className="mt-6 grid gap-5 sm:grid-cols-2">
                {s.steps.map((st, i) => (
                  <li key={st.title} className="card p-6">
                    <span className="text-sm font-semibold text-petroleo-500">Passo {i + 1}</span>
                    <h3 className="mt-2 font-sans text-lg font-semibold tracking-normal">{st.title}</h3>
                    <p className="mt-1 text-slate-600">{st.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl bg-petroleo-900 p-8 text-white shadow-destaque">
                <p className="eyebrow text-petroleo-300">Para quem é</p>
                <p className="mt-3 leading-relaxed text-slate-200">{s.forWhom}</p>
                <p className="mt-6 flex items-center gap-2 text-slate-300"><Clock className="h-5 w-5" /> {s.duration}</p>
                {s.priceFrom && <p className="mt-2 text-slate-300">Investimento: {s.priceFrom}</p>}
                <Link href="#formulario" className="btn-light mt-8 w-full" data-track={`servico_${s.slug}`}>Solicitar proposta</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <ContactSection title="Solicite uma proposta personalizada" origem={`servico-${s.slug}`} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.metaDescription, provider: { "@id": `${site.url}/#empresa` }, areaServed: "BR", url: `${site.url}/servicos/${s.slug}` }} />
    </>
  );
}
