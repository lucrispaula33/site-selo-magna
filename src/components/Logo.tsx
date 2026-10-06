import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";

export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  // Selo Magna: medalha com a árvore (arquivo em public/images/logo-selo-magna.webp)
  return <Image src="/images/logo-selo-magna.webp" alt="" width={88} height={88} className={className} priority />;
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
