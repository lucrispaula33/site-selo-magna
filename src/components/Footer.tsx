import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { site, whatsappLink } from "@/config/site";
import { pilares } from "@/content/pilares";
import { servicos } from "@/content/servicos";
import { InstagramIcon, LinkedInIcon } from "./BrandIcons";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const a = site.contact.address;
  return (
    <footer className="bg-petroleo-950 text-slate-300">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm leading-relaxed text-slate-400">{site.fullName}. {site.tagline}.</p>
          <div className="mt-8">
            <p className="text-sm font-semibold text-white">Receba conteúdos sobre NR-1 e saúde psicossocial</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="lg:col-span-3">
          <p className="font-semibold text-white">Pilares de atuação</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {pilares.map((p) => (
              <li key={p.slug}><Link href={`/pilares/${p.slug}`} className="hover:text-white">{p.short}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="font-semibold text-white">Empresa</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {servicos.map((s) => (
              <li key={s.slug}><Link href={`/servicos/${s.slug}`} className="hover:text-white">{s.title.split(",")[0]}</Link></li>
            ))}
            <li><Link href="/calculadora" className="hover:text-white">Calculadora de custos</Link></li>
            <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="font-semibold text-white">Contato</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={whatsappLink()} target="_blank" rel="noopener" className="flex gap-2 hover:text-white"><Phone className="h-4 w-4 shrink-0 translate-y-0.5" />{site.contact.whatsappDisplay}</a></li>
            <li><a href={`mailto:${site.contact.email}`} className="flex gap-2 hover:text-white"><Mail className="h-4 w-4 shrink-0 translate-y-0.5" />{site.contact.email}</a></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 translate-y-0.5" />{a.city} — {a.state}<br />{site.contact.serviceArea}</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href={site.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="rounded-lg border border-white/15 p-2.5 hover:bg-white/10"><LinkedInIcon /></a>
            <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="rounded-lg border border-white/15 p-2.5 hover:bg-white/10"><InstagramIcon /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName} · CNPJ {site.cnpj}</p>
          <div className="flex gap-5">
            <Link href="/politica-de-privacidade" className="hover:text-white">Política de Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:text-white">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
