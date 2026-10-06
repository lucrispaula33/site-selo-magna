import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./BrandIcons";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Conversar pelo WhatsApp"
      data-track="whatsapp_flutuante"
      className="fixed bottom-5 left-5 z-40 grid h-16 w-16 place-items-center rounded-full bg-whats-500 text-white shadow-destaque transition hover:scale-105 hover:bg-whats-600"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
