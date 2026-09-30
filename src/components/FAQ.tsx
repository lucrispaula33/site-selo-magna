import { ChevronDown } from "lucide-react";
import JsonLd from "./JsonLd";

export default function FAQ({ items, title = "Perguntas frequentes" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      <div className="mt-8 divide-y divide-areia-300 rounded-2xl border border-areia-300/70 bg-white">
        {items.map((f) => (
          <details key={f.q} className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-petroleo-900">
              <h3 className="font-sans text-base tracking-normal">{f.q}</h3>
              <ChevronDown className="h-5 w-5 shrink-0 text-petroleo-500 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </div>
  );
}
