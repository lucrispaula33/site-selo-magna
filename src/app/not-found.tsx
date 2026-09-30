import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container max-w-2xl text-center">
        <p className="eyebrow">Erro 404</p>
        <h1 className="mt-4 text-4xl md:text-5xl">Página não encontrada</h1>
        <p className="lead mt-5">O endereço pode ter mudado. Que tal voltar ao início ou conhecer os 7 pilares?</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Ir para o início</Link>
          <Link href="/pilares" className="btn-outline">Ver os pilares</Link>
        </div>
      </div>
    </section>
  );
}
