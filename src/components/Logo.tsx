import Link from "next/link";
import { site } from "@/config/site";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    // Selo: círculo com anel interno e “S” serifado ao centro
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-petroleo-900" />
      <circle cx="20" cy="20" r="15.5" fill="none" stroke="white" strokeOpacity=".55" strokeWidth="1" strokeDasharray="1.6 1.6" />
      <circle cx="20" cy="20" r="12.5" fill="none" stroke="white" strokeWidth="1.3" />
      <text x="20" y="25.6" textAnchor="middle" fontFamily="Fraunces Variable, Georgia, serif" fontSize="16" fontWeight="600" fill="white">S</text>
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — página inicial`}>
      <LogoMark />
      <span className={`font-serif text-2xl font-semibold tracking-tight ${light ? "text-white" : "text-petroleo-900"}`}>
        Selo <span className={light ? "text-petroleo-300" : "text-petroleo-500"}>Magna</span>
      </span>
    </Link>
  );
}
