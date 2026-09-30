import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Paleta Selo Magna
 * - petroleo: confiança, seriedade, saúde (cor principal)
 * - salvia:   equilíbrio, bem-estar (detalhes)
 * - areia:    fundo quente e acolhedor (evita o "branco hospitalar")
 * - whats:    verde do WhatsApp (botões de conversa)
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.md"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", lg: "2rem" }, screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        petroleo: {
          50: "#EEF6F6", 100: "#D3E9E9", 200: "#A7D2D2", 300: "#6FB2B2", 400: "#3F9394",
          500: "#2A7F80", 600: "#216768", 700: "#134152", 800: "#0F3441", 900: "#0B2733", 950: "#071B24",
        },
        salvia: { 50: "#F3F6F1", 100: "#E4EBDF", 200: "#C9D7C0", 300: "#A8BE9B", 400: "#86A376", 500: "#6A875B" },
        areia: { 50: "#FDFCF9", 100: "#FAF7F1", 200: "#F3EEE4", 300: "#E6DFD2" },
        whats: { 500: "#25D366", 600: "#1EB257" },
        tinta: "#1B2424",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        suave: "0 1px 2px rgba(12,38,39,.04), 0 8px 24px -8px rgba(12,38,39,.12)",
        destaque: "0 24px 60px -20px rgba(12,38,39,.35)",
      },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [typography],
};
export default config;
