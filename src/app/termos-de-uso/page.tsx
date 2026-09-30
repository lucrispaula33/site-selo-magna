import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";

export const metadata = pageMeta({ title: "Termos de Uso", description: "Condições de uso do site da Selo Magna.", path: "/termos-de-uso" });

// Modelo inicial. Recomenda-se revisão por um advogado antes da publicação definitiva.
export default function Termos() {
  return (
    <LegalPage title="Termos de Uso" path="/termos-de-uso" updated="29 de setembro de 2026">
      <p>Ao acessar este site, você concorda com os termos abaixo. Se não concordar, pedimos que não utilize o site.</p>
      <h2>1. Sobre o conteúdo</h2>
      <p>Os conteúdos, artigos, estimativas e a calculadora têm finalidade <strong>informativa e educativa</strong>. Não substituem diagnóstico organizacional, parecer jurídico, avaliação psicológica ou atendimento de saúde.</p>
      <h2>2. Estimativas de custo</h2>
      <p>Os valores apresentados são ilustrativos, baseados em premissas descritas em cada página e em referências de mercado. Resultados reais variam conforme cada organização.</p>
      <h2>3. Propriedade intelectual</h2>
      <p>Textos, marca, logotipo, layout e materiais são de titularidade da {site.name} e não podem ser reproduzidos sem autorização, exceto para citação com a devida fonte.</p>
      <h2>4. Links externos</h2>
      <p>O site pode conter links para sites de terceiros, cujas práticas não são de nossa responsabilidade.</p>
      <h2>5. Privacidade</h2>
      <p>O tratamento de dados pessoais segue a nossa <a href="/politica-de-privacidade">Política de Privacidade</a>.</p>
      <h2>6. Alterações e foro</h2>
      <p>Estes termos podem ser atualizados a qualquer momento. Fica eleito o foro da comarca de {site.contact.address.city}/{site.contact.address.state}. Contato: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
    </LegalPage>
  );
}
