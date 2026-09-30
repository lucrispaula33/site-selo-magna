import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { getPilar, pilares } from "@/content/pilares";
import { pageMeta } from "@/lib/seo";
import { site } from "@/config/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import CostBreakdown from "@/components/CostBreakdown";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pilares.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = getPilar((await params).slug);
  return p ? pageMeta({ title: p.metaTitle, description: p.metaDescription, path: `/pilares/${p.slug}` }) : {};
}

export default async function PilarPage({ params }: Props) {
  const p = getPilar((await params).slug);
  if (!p) notFound();
  const idx = pilares.findIndex((x) => x.slug === p.slug);
  const next = pilares[(idx + 1) % pilares.length];

  return (
    <>
      <section className="pb-16 pt-10 md:pt-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Pilares", href: "/pilares" }, { label: p.short, href: `/pilares/${p.slug}` }]} />
          <div className="mt-10 grid gap-14 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <Icon name={p.icon} className="h-8 w-8 text-petroleo-500" />
                <span className="eyebrow">Pilar {String(idx + 1).padStart(2, "0")} · {p.short}</span>
              </div>
              <h1 className="mt-6 text-4xl leading-[1.1] md:text-5xl">{p.headline}</h1>
              <p className="lead mt-7">{p.intro}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#formulario" className="btn-primary" data-track={`pilar_${p.slug}`}>Quero um diagnóstico</Link>
                <Link href="/calculadora" className="btn-outline">Calcular com meus números</Link>
              </div>
            </div>
            <CostBreakdown slug={p.slug} />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-4xl">Sinais de alerta</h2>
            <ul className="mt-8 space-y-4">
              {p.signs.map((s) => (
                <li key={s} className="flex gap-3 text-slate-700"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />{s}</li>
              ))}
            </ul>
            <div className="mt-12 rounded-2xl bg-petroleo-50 p-7">
              <h3 className="font-sans text-lg font-semibold tracking-normal">Resultados esperados</h3>
              <ul className="mt-4 space-y-2.5">
                {p.results.map((r) => (
                  <li key={r} className="flex gap-3 text-slate-700"><CheckCircle2 className="h-5 w-5 shrink-0 text-petroleo-500" aria-hidden="true" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl">Como a {site.name} resolve</h2>
            <ol className="mt-8 space-y-6">
              {p.approach.map((a, i) => (
                <li key={a.title} className="flex gap-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-petroleo-900 font-semibold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold tracking-normal">{a.title}</h3>
                    <p className="mt-1 leading-relaxed text-slate-600">{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <FAQ items={p.faq} />
          <Link href={`/pilares/${next.slug}`} className="group mt-14 flex items-center justify-between rounded-2xl border border-areia-300/70 bg-white p-7 hover:shadow-suave">
            <span><span className="eyebrow">Próximo pilar</span><span className="mt-2 block font-serif text-2xl text-petroleo-900">{next.short}</span></span>
            <ArrowRight className="h-6 w-6 text-petroleo-500 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <ContactSection
        title={`Quanto ${p.short.toLowerCase()} custa na sua empresa?`}
        text="Receba uma proposta de diagnóstico com os números reais da sua organização, indicadores claros e um plano de ação personalizado."
        defaultChallenge={p.short}
        origem={`pilar-${p.slug}`}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: p.short,
          description: p.metaDescription,
          provider: { "@id": `${site.url}/#empresa` },
          areaServed: "BR",
          url: `${site.url}/pilares/${p.slug}`,
        }}
      />
    </>
  );
}
