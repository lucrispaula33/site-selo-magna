import Script from "next/script";

/**
 * Chat ao vivo (tawk.to). As conversas são respondidas pelo painel ou app do tawk.to.
 * Para trocar ou desativar o chat, altere/remova este componente em src/app/layout.tsx.
 */
const TAWK_SRC = "https://embed.tawk.to/6ac53935b2204734d41d03bb/1k496eump";

export default function TawkChat() {
  return <Script id="tawk-chat" src={TAWK_SRC} strategy="lazyOnload" crossOrigin="anonymous" />;
}
