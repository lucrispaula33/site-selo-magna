# Site Selo Magna

Site institucional e de captação de clientes da **Selo Magna — Solução Estratégica em Liderança e Organização Saudável**.

## Comece por aqui

| Documento | Conteúdo |
|---|---|
| [docs/01-planejamento-estrategico.md](docs/01-planejamento-estrategico.md) | Nicho, concorrência, público, páginas, SEO e conversão |
| [docs/02-wireframes-e-design.md](docs/02-wireframes-e-design.md) | Wireframes, cores, fontes e fotos sugeridas |
| [docs/03-guia-de-publicacao.md](docs/03-guia-de-publicacao.md) | Colocar o site no ar (GitHub + Netlify), Brevo, Analytics |
| [docs/04-guia-de-dominio.md](docs/04-guia-de-dominio.md) | Comprar e conectar o domínio |
| [docs/05-guia-de-manutencao.md](docs/05-guia-de-manutencao.md) | Editar textos, publicar artigos e trocar fotos |

## Arquivos que você vai editar

- `src/config/site.ts` → contatos, redes, missão, visão, valores, equipe
- `src/content/pilares.ts` → os 7 pilares
- `src/content/servicos.ts` → serviços
- `content/blog/*.md` → artigos
- `public/images/` → fotos

## Estrutura de pastas

```
├── content/blog/          artigos do blog (Markdown)
├── docs/                  planejamento e guias
├── public/images/         fotos do site
├── src/
│   ├── app/               páginas (cada pasta = um endereço)
│   │   ├── page.tsx               Início
│   │   ├── sobre/                 /sobre
│   │   ├── pilares/[slug]/        7 landing pages
│   │   ├── servicos/[slug]/       4 serviços
│   │   ├── nr-1/                  landing page NR-1
│   │   ├── calculadora/           calculadora de custos
│   │   ├── blog/[slug]/           artigos
│   │   ├── contato/  obrigado/
│   │   ├── politica-de-privacidade/  termos-de-uso/
│   │   ├── api/lead/              recebe formulários → Brevo
│   │   ├── sitemap.ts  robots.ts  opengraph-image.tsx
│   ├── components/        blocos visuais reutilizáveis
│   ├── config/site.ts     dados gerais da empresa
│   ├── content/           textos de pilares e serviços
│   └── lib/               cálculo de custos, blog, SEO
├── .env.example           variáveis (domínio, Brevo, Analytics)
└── netlify.toml           configuração da hospedagem
```

## Para desenvolvedores

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Next.js 15 · React 19 · TypeScript · Tailwind CSS 3 · Markdown (gray-matter + marked) · Brevo API · GA4 com consentimento (LGPD).
