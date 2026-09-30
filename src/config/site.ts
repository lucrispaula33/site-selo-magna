/**
 * ════════════════════════════════════════════════════════════════
 *  CONFIGURAÇÃO GERAL DO SITE — EDITE AQUI
 * ════════════════════════════════════════════════════════════════
 *  Este é o arquivo mais importante para quem não é técnico.
 *  Tudo o que aparece em vários lugares do site (nome, telefone,
 *  e-mail, endereço, redes sociais, equipe, missão...) está aqui.
 *
 *  Regras simples para editar sem quebrar nada:
 *   1. Altere apenas o texto ENTRE aspas "assim".
 *   2. Não apague vírgulas, chaves { } nem colchetes [ ].
 *   3. Itens marcados com  // TROCAR  são dados de exemplo.
 * ════════════════════════════════════════════════════════════════
 */

export const site = {
  name: "Selo Magna",
  fullName: "Selo Magna — Solução Estratégica em Liderança e Organização Saudável",
  legalName: "Selo Magna Solução Estratégica em Liderança e Organização Saudável Ltda", // TROCAR pela razão social
  cnpj: "00.000.000/0001-00", // TROCAR
  tagline: "Gestão estratégica de riscos psicossociais",

  // O significado do nome (aparece na página inicial e em Sobre)
  acronym: [
    { letter: "S", word: "Solução" },
    { letter: "E", word: "Estratégica em" },
    { letter: "L", word: "Liderança e" },
    { letter: "O", word: "Organização Saudável" },
  ],
  magnaMeaning:
    "Magna vem do latim e significa “grande”, “maior”, como em Carta Magna e magna cum laude, a mais alta distinção. É o nosso compromisso: levar cada cliente ao mais alto padrão de saúde organizacional — e, quando fizer sentido, aos selos e certificações que comprovam isso.",
  description:
    "A Selo Magna ajuda médias e grandes empresas a diagnosticar, monitorar e reduzir os riscos psicossociais que consomem resultados: burnout, turnover, absenteísmo, engajamento e clima. Adequação à NR-1 com PGR auditável.",

  // Endereço oficial. Na hospedagem, use a variável NEXT_PUBLIC_SITE_URL para trocar sem mexer no código.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.selomagna.com.br").replace(/\/$/, ""),

  contact: {
    whatsapp: "5511900000000", // TROCAR — só números: 55 + DDD + número
    whatsappDisplay: "(11) 90000-0000", // TROCAR
    whatsappMessage: "Olá! Vim pelo site da Selo Magna e gostaria de falar com um especialista.",
    email: "contato@selomagna.com.br", // TROCAR
    phoneDisplay: "(11) 90000-0000", // TROCAR
    address: {
      street: "Av. Paulista, 1000 — Bela Vista", // TROCAR (ou deixe só a cidade se atender remotamente)
      city: "São Paulo",
      state: "SP",
      zip: "01310-100", // TROCAR
      country: "BR",
    },
    // Busca usada no mapa do Google (não precisa de chave de API)
    mapsQuery: "Av. Paulista, 1000, São Paulo - SP",
    hours: "Segunda a sexta, 9h às 18h",
    serviceArea: "Atendimento presencial em São Paulo e online em todo o Brasil",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/selo-magna", // TROCAR
    instagram: "https://www.instagram.com/selomagna", // TROCAR
  },

  mission:
    "Auxiliar empresas a diagnosticar, monitorar e melhorar a saúde psicossocial dos colaboradores por meio de indicadores, avaliações especializadas e planos de ação personalizados.",
  vision:
    "Ser a consultoria de referência em soluções integradas de liderança e organização saudável, reconhecida pelo rigor técnico e pelos resultados entregues.",
  values: [
    "Ética e confidencialidade",
    "Rigor científico e clínico",
    "Foco em resultados mensuráveis",
    "Transparência nas relações",
  ],

  // Quem trabalha na Selo Magna
  team: [
    {
      title: "Psicólogos organizacionais",
      text: "Responsáveis pelo diagnóstico psicossocial, pelas avaliações especializadas e pelo desenho dos planos de ação personalizados por indicador.",
    },
    {
      title: "Especialistas em segurança do trabalho",
      text: "Integram os riscos psicossociais ao PGR e à NR-01, com evidências documentadas, auditáveis e prontas para fiscalização.",
    },
    {
      title: "Consultores de liderança",
      text: "Formam e acompanham gestores em liderança saudável, gestão de conflitos, reconhecimento e alta performance.",
    },
    {
      title: "Analistas de clima e indicadores",
      text: "Monitoram indicadores continuamente, garantem relatórios comparáveis e suportam decisões com dados.",
    },
  ],

  differentials: [
    "Identificação do preço dos problemas de saúde mental",
    "Indicadores de saúde detalhados para tomada de decisão",
    "Redução de absenteísmo e presenteísmo",
    "Redução do turnover e queda de custos de contratação",
    "Melhoria do clima organizacional e redução de custos ocultos",
    "Planejamento estratégico assertivo com inovação contínua",
  ],

  trustBar: [
    "NR-01 · Riscos psicossociais",
    "PGR auditável",
    "ISO 45003 como referência",
    "Conformidade e segurança jurídica",
    "LGPD",
  ],

  // Imagens: coloque os arquivos em /public/images com estes nomes.
  // Enquanto não existirem, o site mostra um espaço elegante no lugar.
  images: {
    hero: "/images/hero-escritorio.jpg",
    about: "/images/sobre-reuniao.jpg",
    team: "/images/equipe.jpg",
  },
} as const;

export const whatsappLink = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const mainNav = [
  { label: "Início", href: "/" },
  { label: "Pilares", href: "/pilares" },
  { label: "Serviços", href: "/servicos" },
  { label: "NR-1", href: "/nr-1" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];
