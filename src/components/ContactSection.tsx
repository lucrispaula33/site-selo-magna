import { site, whatsappLink } from "@/config/site";
import LeadForm from "./LeadForm";

export default function ContactSection({
  title = "Vamos conversar sobre a sua organização?",
  text = "Conte o cenário da sua empresa e receba uma proposta de diagnóstico com indicadores claros e plano de ação personalizado.",
  defaultChallenge,
  origem,
}: { title?: string; text?: string; defaultChallenge?: string; origem?: string }) {
  return (
    <section id="formulario" className="section scroll-mt-20 bg-petroleo-900 text-white">
      <div className="container grid items-start gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl text-white md:text-5xl">{title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">{text}</p>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200">
            Nossa abordagem não é apenas sobre bem-estar: é sobre continuidade do negócio, indicadores auditáveis e segurança jurídica.
          </div>
          <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-whats mt-10" data-track="whatsapp_secao">
            Falar agora pelo WhatsApp
          </a>
          <p className="mt-3 text-sm text-slate-400">Atendimento direto com um especialista da {site.name}.</p>
        </div>
        <LeadForm defaultChallenge={defaultChallenge} origem={origem} />
      </div>
    </section>
  );
}
