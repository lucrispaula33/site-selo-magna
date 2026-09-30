import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";

export const metadata = pageMeta({ title: "Política de Privacidade", description: "Como a Selo Magna coleta, usa e protege seus dados pessoais, em conformidade com a LGPD (Lei 13.709/2018).", path: "/politica-de-privacidade" });

// Modelo inicial. Recomenda-se revisão por um advogado antes da publicação definitiva.
export default function Privacidade() {
  return (
    <LegalPage title="Política de Privacidade" path="/politica-de-privacidade" updated="29 de setembro de 2026">
      <p>A {site.legalName} (“{site.name}”), inscrita no CNPJ {site.cnpj}, respeita a sua privacidade. Esta política explica como tratamos dados pessoais em nosso site, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).</p>
      <h2>1. Quais dados coletamos</h2>
      <ul>
        <li><strong>Dados que você informa:</strong> nome, e-mail corporativo, empresa, número de colaboradores, principal desafio e mensagem, quando preenche nossos formulários.</li>
        <li><strong>Dados de navegação:</strong> páginas visitadas, tipo de dispositivo e origem do acesso, coletados por cookies de análise apenas se você aceitar.</li>
      </ul>
      <p>Não coletamos dados de saúde pelo site. Dados de diagnósticos realizados em empresas clientes são tratados em contrato específico, de forma agregada e sob sigilo profissional.</p>
      <h2>2. Para que usamos</h2>
      <ul>
        <li>Responder ao seu contato e enviar propostas (execução de procedimentos preliminares a contrato);</li>
        <li>Enviar conteúdos e novidades, com o seu consentimento, que pode ser retirado a qualquer momento;</li>
        <li>Medir a audiência e melhorar o site (consentimento via aviso de cookies).</li>
      </ul>
      <h2>3. Compartilhamento</h2>
      <p>Compartilhamos dados apenas com fornecedores necessários à operação, como hospedagem (Netlify), envio de e-mails (Brevo), mensagens (WhatsApp/Meta) e análise de audiência (Google Analytics). Não vendemos dados pessoais.</p>
      <h2>4. Por quanto tempo guardamos</h2>
      <p>Pelo tempo necessário às finalidades acima ou até você pedir a exclusão, respeitadas as obrigações legais.</p>
      <h2>5. Seus direitos</h2>
      <p>Você pode solicitar confirmação, acesso, correção, anonimização, portabilidade, exclusão dos dados e revogação do consentimento, escrevendo para <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
      <h2>6. Cookies</h2>
      <p>Usamos cookies essenciais ao funcionamento do site e, se você aceitar, cookies de análise. Você pode mudar sua escolha limpando os dados do navegador.</p>
      <h2>7. Segurança</h2>
      <p>Adotamos conexão criptografada (HTTPS) e medidas técnicas e administrativas para proteger os dados.</p>
      <h2>8. Contato do encarregado (DPO)</h2>
      <p>Dúvidas sobre esta política: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
    </LegalPage>
  );
}
