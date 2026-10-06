import { site, whatsappLink } from "@/config/site";
import LeadForm from "./LeadForm";
import home from "../../content/home.json";

export default function ContactSection({
  title = home.contact.title,
  text = home.contact.text,
  defaultChallenge,
  origem,
  mode = "empresa",
}: { title?: string; text?: string; defaultChallenge?: string; origem?: string; mode?: "empresa" | "mentoria" }) {
  return (
    <section id="formulario" className="section scroll-mt-20 bg-petroleo-900 text-white">
      <div className="container grid items-start gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl text-white md:text-5xl">{title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">{text}</p>
          {mode === "empresa" && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200">
              {home.contact.note}
            </div>
          )}
          <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-whats mt-10" data-track="whatsapp_secao">
            Falar agora pelo WhatsApp
          </a>
          <p className="mt-3 text-sm text-slate-400">Atendimento direto com um especialista da {site.name}.</p>
        </div>
        <LeadForm defaultChallenge={defaultChallenge} origem={origem} mode={mode} />
      </div>
    </section>
  );
}
