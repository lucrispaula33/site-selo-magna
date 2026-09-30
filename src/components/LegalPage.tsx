import Breadcrumbs from "./Breadcrumbs";
export default function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="pb-24 pt-10 md:pt-14">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ label: title, href: path }]} />
        <h1 className="mt-8 text-4xl md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">Última atualização: {updated}</p>
        <div className="prose mt-10 max-w-none prose-headings:font-serif prose-headings:text-petroleo-900 prose-a:text-petroleo-600">{children}</div>
      </div>
    </section>
  );
}
