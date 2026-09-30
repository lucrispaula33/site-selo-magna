"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { mainNav } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-40 border-b transition ${scrolled ? "border-areia-300 bg-areia-100/90 backdrop-blur-md" : "border-areia-300/60 bg-areia-100"}`}>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Pular para o conteúdo
      </a>
      <div className="container flex h-20 items-center justify-between">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {mainNav.map((i) => (
            <Link key={i.href} href={i.href} className={`text-[15px] transition hover:text-petroleo-500 ${isActive(i.href) ? "font-semibold text-petroleo-900" : "text-slate-600"}`}>
              {i.label}
            </Link>
          ))}
          <Link href="/contato#formulario" className="btn-primary px-5 py-3">Falar com especialista</Link>
        </nav>
        <button className="rounded-lg p-2 text-petroleo-900 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"}>
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Menu móvel" className="border-t border-areia-300 bg-areia-100 lg:hidden">
          <div className="container flex flex-col py-4">
            {mainNav.map((i) => (
              <Link key={i.href} href={i.href} className={`border-b border-areia-200 py-3.5 text-lg ${isActive(i.href) ? "font-semibold text-petroleo-900" : "text-slate-700"}`}>
                {i.label}
              </Link>
            ))}
            <Link href="/contato#formulario" className="btn-primary mt-5">Falar com especialista</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
