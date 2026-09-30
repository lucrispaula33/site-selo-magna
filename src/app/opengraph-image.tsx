import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagem que aparece quando o site é compartilhado no WhatsApp, LinkedIn etc.
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0B2733", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: "#134152", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 46, height: 46, borderRadius: 23, border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700 }}>S</div>
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ fontSize: 68, lineHeight: 1.1, fontWeight: 700, maxWidth: 950 }}>O que sua empresa perde em silêncio tem nome — e tem solução.</div>
        <div style={{ fontSize: 26, color: "#6FB2B2", letterSpacing: 3 }}>SOLUÇÃO ESTRATÉGICA EM LIDERANÇA E ORGANIZAÇÃO SAUDÁVEL</div>
      </div>
    ),
    size,
  );
}
