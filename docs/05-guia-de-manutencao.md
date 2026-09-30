# 5. Guia de Manutenção e Edição de Conteúdo

Você não precisa instalar nada. Toda edição é feita pelo navegador, no GitHub. Ao salvar, a Netlify atualiza o site em 1 a 2 minutos.

## Como editar qualquer arquivo pelo navegador

1. Entre em **github.com** → repositório `site-selo-magna`.
2. Navegue até o arquivo (tabela abaixo) e clique nele.
3. Clique no **lápis** ✏️ (Edit this file).
4. Altere **só o texto entre aspas**.
5. Clique em **Commit changes** → **Commit changes**.
6. Acompanhe na Netlify (aba **Deploys**). Se aparecer **Published**, está no ar.

> Se algo der errado, a Netlify **não publica** a versão com erro: o site antigo continua no ar. Para desfazer, em **Deploys**, clique numa versão anterior → **Publish deploy**.

## Onde está cada conteúdo

| O que você quer mudar | Arquivo |
|---|---|
| WhatsApp, e-mail, endereço, redes, CNPJ, missão, visão, valores, equipe, diferenciais | `src/config/site.ts` |
| Textos dos 7 pilares (títulos, sinais, perguntas frequentes) | `src/content/pilares.ts` |
| Serviços (descrição, entregas, etapas, prazo) | `src/content/servicos.ts` |
| Premissas e percentuais dos custos | `src/lib/costs.ts` |
| Artigos do blog | pasta `content/blog/` |
| Fotos | pasta `public/images/` |
| Textos do topo da página inicial | `src/app/page.tsx` |
| Política de Privacidade / Termos | `src/app/politica-de-privacidade/page.tsx` / `src/app/termos-de-uso/page.tsx` |

## Regras de ouro para não quebrar nada

1. Altere apenas o que está **entre aspas** `"assim"`.
2. Não apague vírgulas, chaves `{ }`, colchetes `[ ]` nem aspas.
3. Se precisar usar aspas dentro do texto, use as curvas: “assim”.
4. Uma alteração por vez. Confira o site antes da próxima.

## Publicar um artigo novo no blog

1. Abra a pasta `content/blog/` no GitHub → **Add file → Create new file**.
2. Nome do arquivo = endereço do artigo, sem acentos e com hífens. Ex.: `como-fazer-pesquisa-de-clima.md`.
3. Cole o modelo abaixo e escreva:

```markdown
---
title: "Título do artigo (até 65 caracteres)"
description: "Resumo que aparece no Google (até 155 caracteres)."
date: "2026-10-15"
author: "Equipe Selo Magna"
category: "Clima"
cover: "/images/blog-clima.jpg"
---

Primeiro parágrafo que já responde a dúvida principal.

## Subtítulo

Texto. **Negrito** para destacar. [Texto do link](/pilares/falta-de-engajamento).

- item de lista
- outro item

> Frase de destaque ou chamada para contato.
```

4. **Commit changes.** O artigo aparece no blog, na página inicial e no sitemap automaticamente.

**Boas práticas de SEO para cada artigo:** um tema por artigo; palavra-chave no título, no primeiro parágrafo e em um subtítulo; de 800 a 1.500 palavras; link para o pilar relacionado e para o contato; imagem de capa com nome descritivo.

## Trocar ou adicionar fotos

1. Prepare a foto: JPG, cerca de 1600 px de largura, até 300 KB (use **squoosh.app** para comprimir).
2. Renomeie exatamente como indicado no espaço reservado do site (ex.: `hero-escritorio.jpg`).
3. No GitHub, abra `public/images/` → **Add file → Upload files** → arraste → **Commit changes**.

## Rotina recomendada

| Frequência | Tarefa |
|---|---|
| Semanal | Responder leads (WhatsApp e Brevo) |
| Quinzenal | Publicar 1 artigo no blog e compartilhar no LinkedIn |
| Mensal | Ver no Analytics as páginas mais visitadas e conversões; ver no Search Console as buscas que trazem visitas |
| Trimestral | Atualizar dados (NR-1, estatísticas), revisar textos dos pilares, incluir depoimentos e cases |
| Anual | Renovar o domínio; revisar Política de Privacidade |

## Atualizações técnicas (para um desenvolvedor, 1 a 2 vezes por ano)

```bash
npm install
npm outdated        # ver o que tem versão nova
npm update
npm run build       # garantir que tudo compila
```

Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3. Rodar localmente: `npm install` e `npm run dev` → http://localhost:3000.
