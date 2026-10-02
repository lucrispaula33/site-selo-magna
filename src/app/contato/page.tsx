import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/ContactSection";
import { InstagramIcon, LinkedInIcon } from "@/components/BrandIcons";

export const metadata = pageMeta({
  title: "Contato: Fale com um Especialista",
  description: "Fale com a Selo Magna pelo WhatsApp, e-mail ou formulário. Atendimento presencial em São Paulo e Rio de Janeiro e online em todo o Brasil.",
  path: "/contato",
});

export default function Contato() {
  const a = site.contact.address;
  // Endereço e mapa só aparecem quando preenchidos no painel (Empresa e contatos).
  const hasAddress = Boolean(a.street?.trim());
  const hasMap = Boolean(site.contact.mapsQuery?.trim());
  const items: { icon: typeof Phone; label: string; value: string; href?: string }[] = [
    { icon: Phone, label: "WhatsApp", value: site.contact.whatsappDisplay, href: whatsappLink() },
    { icon: Mail, label: "E-mail", value: site.contact.email, href: `mailto:${site.contact.email}` },
    ...(hasAddress ? [{ icon: MapPin, label: "Endereço", value: `${a.street}, ${a.city} — ${a.state}` }] : []),
    { icon: Clock, label: "Horário", value: site.contact.hours },
  ];
  return (
    <>
      <section className="pb-16 pt-10 md:pt-14">
        <div className="container">
          <Breadcrumbs items={[{ label: "Contato", href: "/contato" }]} />
          <h1 className="mt-8 max-w-3xl text-5xl leading-[1.05] md:text-6xl">Fale com um especialista</h1>
          <p className="lead mt-5 max-w-2xl">Respondemos em até 1 dia útil. {site.contact.serviceArea}.</p>
          <div className={`mt-12 grid gap-8 ${hasMap ? "lg:grid-cols-2" : ""}`}>
            <ul className={`grid gap-4 sm:grid-cols-2 ${hasMap ? "" : "lg:grid-cols-3"}`}>
              {items.map(({ icon: I, label, value, href }) => (
                <li key={label} className="card p-6">
                  <I className="h-6 w-6 text-petroleo-500" aria-hidden="true" />
                  <p className="mt-4 text-sm text-slate-500">{label}</p>
                  {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="mt-1 block font-semibold text-petroleo-900 hover:underline">{value}</a> : <p className="mt-1 font-semibold text-petroleo-900">{value}</p>}
                </li>
              ))}
              <li className={`card flex items-center gap-3 p-6 sm:col-span-2 ${hasMap ? "" : "lg:col-span-3"}`}>
                <span className="mr-auto text-slate-600">Siga a {site.name}</span>
                <a href={site.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="rounded-lg border border-areia-300 p-2.5 text-petroleo-900 hover:bg-areia-100"><LinkedInIcon /></a>
                <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="rounded-lg border border-areia-300 p-2.5 text-petroleo-900 hover:bg-areia-100"><InstagramIcon /></a>
              </li>
            </ul>
            {hasMap && (
            <div className="min-h-[320px] overflow-hidden rounded-3xl border border-areia-300/70">
              <iframe
                title={`Mapa: ${site.name} em ${a.city}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapsQuery)}&output=embed`}
                className="h-full min-h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            )}
          </div>
        </div>
      </section>
      <ContactSection origem="contato" />
    </>
  );
}
