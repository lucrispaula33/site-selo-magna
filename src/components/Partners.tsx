import Image from "next/image";
import { Check } from "lucide-react";
import sobre from "../../content/sobre.json";

type Partner = {
  name: string;
  role: string;
  photo: string;
  chapter: string;
  story: string;
  focus: string[];
  linkedin?: string;
};

/** Seção "As sócias" da página Sobre. Os textos ficam em content/sobre.json (painel: Páginas → Sobre). */
export default function Partners() {
  const partners = (sobre.partners ?? []) as Partner[];
  if (!partners.length) return null;
  return (
    <section className="section bg-white" id="socias">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">{sobre.partnersEyebrow}</p>
          <h2 className="mt-4 text-4xl md:text-5xl">{sobre.partnersTitle}</h2>
          {sobre.partnersIntro?.map((p, i) => (
            <p key={i} className={`lead ${i === 0 ? "mt-6" : "mt-4"}`}>{p}</p>
          ))}
        </div>

        <ol className="mt-16 space-y-16 md:space-y-20">
          {partners.map((p, i) => (
            <li key={p.name} className={`grid items-start gap-8 md:gap-12 ${i % 2 ? "md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px]" : "md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]"}`}>
              <div className={`flex flex-col items-center md:items-start ${i % 2 ? "md:order-2 md:items-end" : ""}`}>
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-petroleo-100 to-areia-200" aria-hidden="true" />
                  <Image
                    src={p.photo}
                    alt={`Foto de ${p.name}`}
                    width={240}
                    height={240}
                    className="relative h-48 w-48 rounded-full object-cover shadow-suave lg:h-56 lg:w-56"
                  />
                </div>
              </div>
              <div className={i % 2 ? "md:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-petroleo-500">
                  {String(i + 1).padStart(2, "0")} · {p.chapter}
                </p>
                <h3 className="mt-3 text-3xl md:text-4xl">{p.name}</h3>
                <p className="mt-2 font-medium text-petroleo-700">{p.role}</p>
                <div className="mt-5 max-w-2xl space-y-3 leading-relaxed text-slate-600 md:text-lg">
                  {p.story.split(/\n\s*\n/).map((par, k) => <p key={k}>{par}</p>)}
                </div>
                <ul className="mt-6 grid max-w-2xl gap-2.5 sm:grid-cols-2">
                  {p.focus.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[15px] leading-snug text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-petroleo-500" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                {p.linkedin && (
                  <a href={p.linkedin} target="_blank" rel="noopener" className="mt-6 inline-block text-sm font-semibold text-petroleo-600 hover:underline">
                    Ver perfil no LinkedIn →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        {sobre.partnersCommonText && (
          <div className="mt-20 rounded-3xl bg-petroleo-900 p-8 text-white md:p-12">
            <h3 className="text-2xl text-white md:text-3xl">{sobre.partnersCommonTitle}</h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-petroleo-100 md:text-lg">{sobre.partnersCommonText}</p>
          </div>
        )}
      </div>
    </section>
  );
}
