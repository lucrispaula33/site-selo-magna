import { NextResponse } from "next/server";

/**
 * Recebe os contatos do site e:
 *  1) adiciona/atualiza o contato na lista de e-mail marketing do Brevo;
 *  2) envia um e-mail de aviso para a equipe.
 * Se o Brevo ainda não estiver configurado, o site continua funcionando
 * normalmente (o contato chega pelo WhatsApp).
 */
const clean = (v: unknown, max = 500) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const email = clean(body.email, 200).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  if (!body.consent) return NextResponse.json({ ok: false, error: "consent" }, { status: 400 });

  const lead = {
    nome: clean(body.nome, 120),
    email,
    empresa: clean(body.empresa, 160),
    colaboradores: clean(body.colaboradores, 60),
    desafio: clean(body.desafio, 120),
    mensagem: clean(body.mensagem, 2000),
    origem: clean(body.origem, 80),
  };

  const key = process.env.BREVO_API_KEY;
  if (!key) {
    console.log("[lead] Brevo não configurado. Lead recebido:", lead.email, lead.origem);
    return NextResponse.json({ ok: true, stored: false });
  }

  const headers = { "api-key": key, "Content-Type": "application/json", accept: "application/json" };
  const listId = Number(process.env.BREVO_LIST_ID || 2);
  const [firstName, ...rest] = lead.nome.split(" ");

  const tasks: Promise<Response>[] = [
    fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds: [listId],
        attributes: { FIRSTNAME: firstName || "", LASTNAME: rest.join(" "), EMPRESA: lead.empresa, COLABORADORES: lead.colaboradores, DESAFIO: lead.desafio, ORIGEM: lead.origem },
      }),
    }),
  ];

  const notify = process.env.LEAD_NOTIFY_EMAIL;
  if (notify && lead.origem !== "newsletter") {
    tasks.push(
      fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers,
        body: JSON.stringify({
          sender: { name: "Site Selo Magna", email: process.env.BREVO_SENDER_EMAIL || notify },
          to: [{ email: notify }],
          replyTo: { email },
          subject: `Novo contato pelo site: ${lead.empresa || lead.nome}`,
          textContent: Object.entries(lead).map(([k, v]) => `${k}: ${v}`).join("\n"),
        }),
      }),
    );
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === "rejected" && console.error("[lead] erro Brevo", r.reason));
  return NextResponse.json({ ok: true, stored: true });
}
