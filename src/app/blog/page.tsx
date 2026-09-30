import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { formatDate, getAllPosts } from "@/lib/blog";
import Breadcrumbs from "@/components/Breadcrumbs";
import ImageSlot from "@/components/ImageSlot";

export const metadata = pageMeta({
  title: "Blog: NR-1, Saúde Mental e Liderança",
  description: "Artigos práticos para RH e lideranças sobre NR-1, riscos psicossociais, burnout, turnover, engajamento e cultura organizacional saudável.",
  path: "/blog",
});

export default function Blog() {
  const posts = getAllPosts();
  return (
    <section className="pb-24 pt-10 md:pt-14">
      <div className="container">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
        <h1 className="mt-8 text-5xl md:text-6xl">Conteúdos para líderes e RH</h1>
        <p className="lead mt-5 max-w-2xl">NR-1, riscos psicossociais, indicadores e liderança saudável — explicados de forma prática.</p>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="group">
              <Link href={`/blog/${p.slug}`}>
                {p.cover && <ImageSlot src={p.cover} alt={p.title} className="aspect-[16/10] !shadow-none" sizes="(min-width:1024px) 33vw, 100vw" />}
                <p className="eyebrow mt-6">{p.category}</p>
                <h2 className="mt-3 text-2xl leading-snug group-hover:text-petroleo-600">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{p.description}</p>
                <p className="mt-4 text-sm text-slate-500">{formatDate(p.date)} · {p.readingTime} min de leitura</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
