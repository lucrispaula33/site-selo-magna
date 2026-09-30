import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { servicos } from "@/content/servicos";
import { getAllPosts, formatDate } from "@/lib/blog";
import ImageSlot from "@/components/ImageSlot";
import Icon from "@/components/Icon";
import ContactSection from "@/components/ContactSection";
import { CostSilence, Differentials, MissionVisionValues, PillarsGrid, SeloMeaning, TeamGrid, TrustBar } from "@/components/Sections";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="container grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-petroleo-200 bg-petroleo-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-petroleo-600">
              Gestão estratégica de riscos psicossociais
            </span>
            <h1 className="mt-7 text-5xl leading-[1.05] md:text-6xl xl:text-[4rem]">
              O que sua empresa perde em silêncio tem nome — e tem solução.
            </h1>
            <p className="lead mt-7 max-w-xl">
              A {site.name} ajuda médias e grandes empresas a diagnosticar, monitorar e reduzir os riscos psicossociais que consomem
              resultados: burnout, turnover, absenteísmo, engajamento e clima.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contato#formulario" className="btn-primary" data-track="hero_especialista">Falar com um especialista</Link>
              <Link href="/#pilares" className="btn-outline">Conhecer os 7 pilares</Link>
            </div>
          </div>
          <div className="relative">
            <ImageSlot src={site.images.hero} alt="Ambiente corporativo acolhedor com profissionais conversando" className="aspect-[4/3]" priority />
            <div className="absolute -bottom-8 left-4 right-4 rounded-2xl bg-white p-5 shadow-destaque sm:left-8 sm:right-auto sm:max-w-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-petroleo-500">Referência do setor</p>
              <p className="mt-2 font-medium text-petroleo-900">35% de turnover = 35 desligamentos por ano em uma empresa de 100 pessoas.</p>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* QUEM TRABALHA */}
      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Quem trabalha na {site.name}</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Uma equipe multidisciplinar para um problema multidimensional.</h2>
            <p className="lead mt-6">
              Riscos psicossociais não se resolvem com uma única especialidade. A {site.name} combina psicologia organizacional,
              segurança do trabalho, desenvolvimento de lideranças e análise de indicadores — com a relação custo-benefício em cada
              recomendação e foco na melhoria contínua do dia a dia.
            </p>
            <div className="mt-10"><TeamGrid /></div>
            <Link href="/sobre" className="mt-8 inline-flex items-center gap-2 font-semibold text-petroleo-500 hover:text-petroleo-700">
              Conhecer a consultoria <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ImageSlot src={site.images.team} alt="Consultores analisando indicadores com a liderança de uma empresa" className="aspect-[4/5] lg:mt-24" />
        </div>
        <div className="container mt-20"><SeloMeaning /></div>
        <div className="container mt-14">
          <MissionVisionValues />
        </div>
      </section>

      <PillarsGrid />

      <CostSilence />

      {/* SERVIÇOS */}
      <section className="section pt-0">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Como trabalhamos</p>
              <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">Do diagnóstico ao acompanhamento contínuo.</h2>
            </div>
            <Link href="/servicos" className="btn-outline">Ver todos os serviços</Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {servicos.map((s, i) => (
              <Link key={s.slug} href={`/servicos/${s.slug}`} className="card group transition hover:-translate-y-1 hover:shadow-suave">
                <div className="flex items-center justify-between">
                  <Icon name={s.icon} className="h-8 w-8 text-petroleo-500" />
                  <span className="text-sm text-slate-400">Etapa {i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-petroleo-500">Saiba mais <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="section bg-areia-200/50">
        <div className="container">
          <h2 className="text-4xl md:text-5xl">Nossos diferenciais</h2>
          <div className="mt-10"><Differentials /></div>
        </div>
      </section>

      {/* NR-1 */}
      <section className="section">
        <div className="container">
          <div className="grid items-center gap-10 rounded-4xl bg-petroleo-50 p-8 md:p-14 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow">NR-1 em vigor</p>
              <h2 className="mt-4 text-3xl md:text-4xl">Desde 26 de maio de 2026, os riscos psicossociais no PGR estão sujeitos a fiscalização.</h2>
              <p className="lead mt-5">Diagnóstico, inventário, plano de ação e evidências auditáveis — tudo integrado ao trabalho do seu SESMT.</p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link href="/nr-1" className="btn-primary">Entender a adequação à NR-1</Link>
              <Link href="/blog/nr-1-riscos-psicossociais-o-que-muda" className="btn-outline">Ler o guia completo</Link>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      {posts.length > 0 && (
        <section className="section pt-0">
          <div className="container">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-4xl md:text-5xl">Conteúdos para líderes e RH</h2>
              <Link href="/blog" className="hidden font-semibold text-petroleo-500 md:inline-flex md:items-center md:gap-2">Ver o blog <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card group transition hover:shadow-suave">
                  <p className="eyebrow">{p.category}</p>
                  <h3 className="mt-3 text-xl leading-snug group-hover:text-petroleo-600">{p.title}</h3>
                  <p className="mt-3 text-sm text-slate-500">{formatDate(p.date)} · {p.readingTime} min de leitura</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection origem="home" />
    </>
  );
}
