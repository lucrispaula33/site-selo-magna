import { NextResponse } from "next/server";
import { brl } from "@/lib/costs";
import { alertaFiscalizacao, calcular, entradaSegura, resumo, tituloEstagio, ESTAGIOS } from "@/lib/calculadora";
import { site, whatsappLink } from "@/config/site";

/**
 * Relatório da calculadora por e-mail.
 * 1) Recalcula o resultado no servidor (não confia nos números vindos do navegador);
 * 2) envia o relatório para a pessoa pelo Brevo;
 * 3) guarda o contato no Brevo (na lista de conteúdos só se ela aceitou);
 * 4) avisa a equipe.
 * Sem BREVO_API_KEY, responde { sent: false } e a tela libera o relatório mesmo assim.
 *
 * Variáveis na Netlify: BREVO_API_KEY, BREVO_SENDER_EMAIL (ex.: solucoes@selomagna.com.br),
 * LEAD_NOTIFY_EMAIL (quem recebe o aviso), BREVO_REPLY_TO (opcional), BREVO_LIST_ID (opcional).
 */
const clean = (v: unknown, max = 200) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  if (clean(body.website)) return NextResponse.json({ ok: true, sent: false }); // robô (campo invisível preenchido)

  const email = clean(body.email).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  const nome = clean(body.nome, 120);
  const empresa = clean(body.empresa, 160);
  const novidades = body.novidades === true;
  const entrada = entradaSegura(body.entrada);
  if (!entrada) return NextResponse.json({ ok: false, error: "entrada" }, { status: 400 });

  const r = calcular(entrada);
  const topo = resumo(r, true);
  const est = ESTAGIOS[r.estagio];
  const alerta = alertaFiscalizacao(r, entrada);

  const key = process.env.BREVO_API_KEY;
  if (!key) {
    console.log("[calculadora] Brevo não configurado. Pedido de relatório:", email, empresa);
    return NextResponse.json({ ok: true, sent: false });
  }

  const sender = { name: "Selo Magna", email: process.env.BREVO_SENDER_EMAIL || "solucoes@selomagna.com.br" };
  const replyTo = { email: process.env.BREVO_REPLY_TO || site.contact.email };
  const headers = { "api-key": key, "Content-Type": "application/json", accept: "application/json" };
  const primeiroNome = nome.split(" ")[0] || "";

  const linhasHtml = r.linhas.map((l) => `
    <tr>
      <td style="padding:10px 8px;border-top:1px solid #E8E1D2;">${esc(l.i.curto)}<br><span style="font-size:12px;color:${!l.medido ? "#64748b" : l.ev > 0 ? "#B45309" : "#2A7F80"};">${!l.medido ? "Não medido" : l.ev > 0 ? "Acima da referência" : "Dentro da referência"}</span></td>
      <td style="padding:10px 8px;border-top:1px solid #E8E1D2;text-align:right;white-space:nowrap;">${l.medido ? esc(l.txt) : "—"}</td>
      <td style="padding:10px 8px;border-top:1px solid #E8E1D2;text-align:right;color:#475569;">${esc(l.ref)}</td>
      <td style="padding:10px 8px;border-top:1px solid #E8E1D2;text-align:right;white-space:nowrap;font-weight:bold;">${l.medido ? brl(l.ev) : "—"}</td>
    </tr>`).join("");

  const html = `<!doctype html><html lang="pt-BR"><body style="margin:0;background:#F6F1E7;font-family:Arial,Helvetica,sans-serif;color:#132E2C;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F1E7;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;">
  <tr><td style="background:#132E2C;color:#F6F1E7;padding:28px 28px 24px;">
    <p style="margin:0;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#C9A04A;">Calculadora Selo Magna</p>
    <p style="margin:10px 0 0;font-family:Georgia,serif;font-size:26px;line-height:1.25;">${esc(topo.titulo)}</p>
    <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#cbd5d4;">${esc(topo.texto)}</p>
  </td></tr>
  <tr><td style="padding:24px 28px 8px;font-size:15px;line-height:1.6;">
    <p style="margin:0 0 12px;">Olá${primeiroNome ? `, ${esc(primeiroNome)}` : ""}!</p>
    <p style="margin:0;">Aqui está o relatório que você pediu${empresa ? ` para a <b>${esc(empresa)}</b>` : ""}, com base nos números informados: ${r.N} colaboradores, salário médio de ${brl(entrada.sal)} e ${entrada.enc}% de encargos e benefícios.</p>
  </td></tr>
  <tr><td style="padding:16px 20px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border:1px solid #E8E1D2;border-radius:12px;">
      <tr style="background:#F1EBDD;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#475569;">
        <td style="padding:10px 8px;">Indicador</td><td style="padding:10px 8px;text-align:right;">Seu número</td><td style="padding:10px 8px;text-align:right;">Referência</td><td style="padding:10px 8px;text-align:right;">Evitável/ano</td>
      </tr>${linhasHtml}
      <tr><td colspan="3" style="padding:12px 8px;border-top:2px solid #132E2C;font-weight:bold;">Custo evitável estimado por ano</td><td style="padding:12px 8px;border-top:2px solid #132E2C;text-align:right;font-weight:bold;white-space:nowrap;">${r.medidos ? brl(r.evitavel) : "—"}</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:8px 20px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${alerta.itens.length ? "#FFFBEB" : "#F6F1E7"};border:1px solid ${alerta.itens.length ? "#FDE68A" : "#E8E1D2"};border-radius:12px;"><tr><td style="padding:18px 18px 14px;">
      <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#B45309;">${alerta.itens.length ? "Alerta" : "Fiscalização"}</p>
      <p style="margin:6px 0 8px;font-family:Georgia,serif;font-size:18px;">${esc(alerta.titulo)}</p>
      ${alerta.itens.length ? `<ul style="margin:0 0 8px;padding-left:20px;font-size:14px;line-height:1.6;">${alerta.itens.map((x) => `<li style="margin-bottom:6px;">${esc(x)}</li>`).join("")}</ul>` : ""}
      <p style="margin:0;font-size:12px;line-height:1.5;color:#64748b;">${esc(alerta.nota)}</p>
    </td></tr></table>
  </td></tr>
  <tr><td style="padding:8px 28px 4px;">
    <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#2A7F80;">Próximos passos</p>
    <p style="margin:8px 0 8px;font-family:Georgia,serif;font-size:19px;">${esc(tituloEstagio(r))}</p>
    <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.6;">${est.itens.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
  </td></tr>
  <tr><td style="padding:24px 28px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0F4C4A;border-radius:12px;"><tr><td style="padding:20px 22px;color:#F6F1E7;">
      <p style="margin:0;font-family:Georgia,serif;font-size:18px;">Quer entender esses números com a gente?</p>
      <p style="margin:8px 0 16px;font-size:14px;line-height:1.5;color:#d7e6e3;">Converse 30 minutos com a equipe da Selo Magna, sem custo. Mostramos de onde vem cada valor e o que faz sentido para o momento da sua empresa.</p>
      <a href="${whatsappLink("Olá! Recebi o relatório da calculadora da Selo Magna e gostaria de agendar a conversa de 30 minutos.")}" style="display:inline-block;background:#C9A04A;color:#132E2C;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:999px;">Agendar conversa pelo WhatsApp</a>
    </td></tr></table>
  </td></tr>
  <tr><td style="padding:0 28px 24px;font-size:12px;line-height:1.6;color:#64748b;">
    <p style="margin:0 0 8px;">Estimativa educativa, calculada a partir dos números informados e de referências publicadas. Não é diagnóstico. As fontes de cada referência estão na página da <a href="${site.url}/calculadora" style="color:#2A7F80;">calculadora</a>. Para um número preciso, faça o diagnóstico.</p>
    <p style="margin:0 0 8px;">Você recebeu este e-mail porque pediu o relatório na calculadora do site. Para falar com a equipe, é só responder.</p>
    <p style="margin:0;color:#132E2C;">Selo Magna · <a href="${site.url}" style="color:#2A7F80;">selomagna.com.br</a><br>Responsável técnica: Luana de Paula, Psicóloga, CRP 06/170221</p>
  </td></tr>
</table></td></tr></table></body></html>`;

  const [firstName, ...rest] = nome.split(" ");
  const listId = Number(process.env.BREVO_LIST_ID || 2);
  const notify = process.env.LEAD_NOTIFY_EMAIL;

  const envio = fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers,
    body: JSON.stringify({ sender, to: [{ email, name: nome || undefined }], replyTo, subject: "Seu relatório da Calculadora Selo Magna", htmlContent: html, tags: ["calculadora"] }),
  });

  const extras: Promise<Response>[] = [
    fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        updateEnabled: true,
        ...(novidades ? { listIds: [listId] } : {}),
        attributes: { FIRSTNAME: firstName || "", LASTNAME: rest.join(" "), EMPRESA: empresa, COLABORADORES: String(r.N), ORIGEM: "calculadora" },
      }),
    }),
  ];
  if (notify) {
    extras.push(fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender,
        to: [{ email: notify }],
        replyTo: { email },
        subject: `Calculadora: ${empresa || nome} pediu o relatório`,
        textContent: [
          `Nome: ${nome}`, `E-mail: ${email}`, `Empresa: ${empresa}`, `Aceitou conteúdos: ${novidades ? "sim" : "não"}`, "",
          `Colaboradores: ${r.N} · Salário médio: ${brl(entrada.sal)} · Encargos: ${entrada.enc}%`,
          `Resultado: ${topo.titulo}`, topo.texto, `Alertas de fiscalização: ${alerta.itens.length}`, `Momento: ${est.nome} (${r.P} de 5 práticas)`,
        ].join("\n"),
      }),
    }));
  }

  let sent = false;
  try { const res = await envio; sent = res.ok; if (!res.ok) console.error("[calculadora] Brevo recusou o envio:", res.status, await res.text()); }
  catch (err) { console.error("[calculadora] erro no envio", err); }
  const results = await Promise.allSettled(extras);
  results.forEach((x) => x.status === "rejected" && console.error("[calculadora] erro Brevo", x.reason));

  return NextResponse.json({ ok: true, sent });
}
