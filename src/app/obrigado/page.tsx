import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { site, whatsappLink } from "@/config/site";

export const metadata: Metadata = { title: "Obrigado pelo contato", robots: { index: false } };

// Página de agradecimento: use a visita a /obrigado como "conversão" no Google Analytics/Ads.
export default function Obrigado() {
  return (
    <section className="section">
      <div className="container max-w-2xl text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-petroleo-500" />
        <h1 className="mt-6 text-4xl md:text-5xl">Recebemos o seu contato!</h1>
        <p className="lead mt-5">
          Sua mensagem foi aberta no WhatsApp — é só tocar em <strong>enviar</strong> por lá. Um especialista da {site.name} responde em até 1 dia útil.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-whats">O WhatsApp não abriu? Clique aqui</a>
          <Link href="/blog" className="btn-outline">Ler nossos conteúdos</Link>
        </div>
      </div>
    </section>
  );
}
