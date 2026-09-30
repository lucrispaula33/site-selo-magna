import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Painel de edição: selomagna.com.br/admin
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
  // Cabeçalhos de segurança aplicados em todas as páginas
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
