# 3. Guia de Publicação (passo a passo, sem conhecimento técnico)

Tempo estimado: 30 minutos. Custo: R$ 0.

## Como funciona (em uma frase)

O código do site fica guardado no **GitHub** (um "cofre" de arquivos) e a **Netlify** pega esses arquivos, monta o site e o coloca no ar. Sempre que você altera um arquivo no GitHub, a Netlify atualiza o site sozinha em 1 a 2 minutos.

> **Por que Netlify?** O plano gratuito permite uso comercial, tem HTTPS (cadeado) incluído e conecta domínio com poucos cliques. A Vercel também funciona muito bem, mas o plano gratuito dela é só para uso não comercial, e para uma consultoria seria necessário o plano Pro (US$ 20/mês).

## Passo 1 — Criar conta no GitHub

1. Acesse **github.com** e clique em **Sign up**.
2. Use o e-mail da empresa. Escolha um nome de usuário (ex.: `selo-magna`).
3. Confirme o e-mail.

## Passo 2 — Enviar os arquivos do site para o GitHub

1. Descompacte o arquivo `selo-magna-site.zip` no seu computador.
2. No GitHub, clique no **+** (canto superior direito) → **New repository**.
3. Nome: `site-selo-magna`. Marque **Private**. Clique em **Create repository**.
4. Na página seguinte, clique no link **uploading an existing file**.
5. Abra a pasta descompactada, selecione **tudo o que está dentro dela** (as pastas `src`, `content`, `docs`, `public` e os demais arquivos) e arraste para a janela do GitHub.
   - Não envie as pastas `node_modules` e `.next` se existirem (elas não vêm no zip).
6. Clique em **Commit changes**.

## Passo 3 — Publicar na Netlify

1. Acesse **app.netlify.com** e clique em **Sign up** → **Sign up with GitHub**.
2. Clique em **Add new site** → **Import an existing project** → **GitHub**.
3. Autorize e escolha o repositório `site-selo-magna`.
4. A Netlify reconhece o Next.js sozinha. Não mude nada. Clique em **Deploy**.
5. Em 2 a 4 minutos o site estará no ar num endereço como `nome-aleatorio.netlify.app`.
6. Para escolher um nome melhor: **Site configuration → Change site name** → `selo-magna` (fica `selo-magna.netlify.app`).

## Passo 4 — Configurar as variáveis (5 minutos)

Na Netlify: **Site configuration → Environment variables → Add a variable**. Cadastre:

| Nome | Valor | Para quê |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://selo-magna.netlify.app` (depois, o domínio) | Endereço oficial usado no Google e no sitemap |
| `BREVO_API_KEY` | chave do Brevo (Passo 5) | Guardar leads e avisar por e-mail |
| `BREVO_LIST_ID` | número da lista no Brevo | Lista de e-mail marketing |
| `LEAD_NOTIFY_EMAIL` | e-mail que recebe os avisos | Aviso de novo contato |
| `BREVO_SENDER_EMAIL` | e-mail remetente verificado no Brevo | Remetente dos avisos |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXX` (Passo 6) | Google Analytics |

Depois de salvar: **Deploys → Trigger deploy → Deploy site**.

## Passo 5 — E-mail marketing e captura de leads (Brevo, gratuito)

1. Crie conta em **brevo.com** (plano gratuito: até 300 e-mails/dia).
2. **Contatos → Listas → Criar lista** "Leads do site". Anote o número (ID) da lista.
3. **Contatos → Configurações → Atributos**: crie os atributos de texto `EMPRESA`, `COLABORADORES`, `DESAFIO` e `ORIGEM`.
4. **Remetentes e domínios**: adicione e verifique o e-mail que enviará os avisos.
5. **Menu do perfil → SMTP e API → Chaves de API → Gerar nova chave**. Copie para `BREVO_API_KEY`.

Pronto: cada formulário enviado vira um contato na lista (com empresa, porte e desafio) e você recebe um e-mail de aviso. Pelo próprio Brevo você cria newsletters e sequências automáticas (ex.: boas-vindas + guia NR-1).

## Passo 6 — Google Analytics e Search Console

**Analytics (medir visitas e conversões):**
1. **analytics.google.com** → criar propriedade "Selo Magna" → fluxo **Web** com o endereço do site.
2. Copie o ID `G-XXXXXXX` para `NEXT_PUBLIC_GA_ID`.
3. Em **Administrador → Eventos**, marque como conversão a visita à página `/obrigado` e o evento `generate_lead_click` (cliques no WhatsApp).
4. O Analytics só é ativado para quem clicar em "Aceitar" no aviso de cookies (exigência da LGPD).

**Search Console (aparecer no Google):**
1. **search.google.com/search-console** → Adicionar propriedade → **Prefixo do URL** → cole o endereço.
2. Escolha verificação por **tag HTML**, copie só o código do `content="…"` e cadastre em `NEXT_PUBLIC_GOOGLE_VERIFICATION`. Refaça o deploy e clique em **Verificar**.
3. Em **Sitemaps**, envie `sitemap.xml`.

**Perfil da Empresa no Google (Google Meu Negócio):** cadastre em **business.google.com** com o mesmo nome, telefone e endereço do site. Isso ajuda a aparecer no mapa e em buscas locais.

## Passo 7 — Trocar os dados de exemplo

Antes de divulgar, edite `src/config/site.ts` (veja o Guia de Manutenção) e troque tudo o que está marcado com `// TROCAR`: WhatsApp, e-mail, endereço, CNPJ e redes sociais. Adicione também as fotos em `public/images/`.

## Checklist final antes de divulgar

- [ ] WhatsApp abre o número certo (teste no celular)
- [ ] Formulário enviado aparece na lista do Brevo e chega o e-mail de aviso
- [ ] Endereço do mapa correto
- [ ] Fotos adicionadas
- [ ] Política de Privacidade e Termos revisados por um advogado
- [ ] Search Console verificado e sitemap enviado
