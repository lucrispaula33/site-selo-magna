import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { formatDate, getAllPosts, readPost } from "@/lib/blog";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/ContactSection";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = readPost((await params).slug);
  return p ? pageMeta({ title: p.title, description: p.description, path: `/blog/${p.slug}`, type: "article" }) : {};
}

export default async function PostPage({ params }: Props) {
  const p = readPost((await params).slug);
  if (!p) notFound();
  return (
    <>
      <article className="pb-20 pt-10 md:pt-14">
        <div className="container max-w-3xl">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: p.category, href: `/blog/${p.slug}` }]} />
          <p className="eyebrow mt-10">{p.category}</p>
          <h1 className="mt-4 text-4xl leading-[1.1] md:text-5xl">{p.title}</h1>
          <p className="lead mt-5">{p.description}</p>
          <p className="mt-6 border-b border-areia-300 pb-8 text-sm text-slate-500">
            Por {p.author} · <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingTime} min de leitura
          </p>
          <div
            className="prose prose-lg mt-10 max-w-none prose-headings:font-serif prose-headings:text-petroleo-900 prose-a:text-petroleo-600 prose-blockquote:border-petroleo-400 prose-blockquote:bg-petroleo-50 prose-blockquote:py-1 prose-blockquote:not-italic prose-strong:text-petroleo-900 prose-table:text-base"
            dangerouslySetInnerHTML={{ __html: p.html }}
          />
          <div className="mt-14 rounded-3xl bg-petroleo-50 p-8">
            <p className="font-serif text-2xl text-petroleo-900">Quer aplicar isso na sua empresa?</p>
            <p className="mt-2 text-slate-600">Converse com um especialista da {site.name} e receba uma proposta de diagnóstico.</p>
            <Link href="#formulario" className="btn-primary mt-5">Falar com especialista</Link>
          </div>
        </div>
      </article>
      <ContactSection origem={`blog-${p.slug}`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          author: { "@type": "Organization", name: p.author },
          publisher: { "@id": `${site.url}/#empresa` },
          mainEntityOfPage: `${site.url}/blog/${p.slug}`,
          inLanguage: "pt-BR",
        }}
      />
    </>
  );
}
