import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * Mostra a imagem se o arquivo existir em /public.
 * Se ainda não existir, mostra um espaço elegante com o nome do arquivo esperado,
 * para você saber exatamente qual foto colocar.
 */
export default function ImageSlot({
  src, alt, className = "", priority = false, sizes = "(min-width: 1024px) 50vw, 100vw",
}: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-areia-300/70 shadow-destaque ${className}`}>
      {exists ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-petroleo-800 via-petroleo-700 to-petroleo-500" role="img" aria-label={alt}>
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
            <defs>
              <pattern id="d" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect x="14" y="14" width="28" height="28" fill="none" stroke="white" strokeWidth="1.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#d)" />
          </svg>
          <div className="absolute left-4 top-4 rounded-md bg-black/25 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur">
            Foto sugerida: {src}
          </div>
        </div>
      )}
    </div>
  );
}
