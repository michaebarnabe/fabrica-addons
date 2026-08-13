export interface Addon {
  name: string;
  slug: string;
  description: string;
  is_premium: string;
  path: string;
  folder: string;
}

export function getAvailableAddons(): Addon[] {
  const addons: Addon[] = [
    {
      name: "Bloco de Notas",
      slug: "bloco-de-notas",
      description: "Um bloco de notas simples com armazenamento local e busca avançada. Crie, edite e organize suas notas com facilidade.",
      is_premium: "0",
      path: "/addons/bloco-de-notas",
      folder: "bloco-de-notas"
    },
    {
      name: "Cortador de Imagens para Carrossel",
      slug: "post-slice-grid",
      description: "Este é um addon que te ajuda no corte de post carrossel contínuo.",
      is_premium: "0",
      path: "/addons/post-slice-grid",
      folder: "post-slice-grid"
    },
    {
      name: "Otimizador de Imagens Pro",
      slug: "otimizador-imagens-pro",
      description: "Ferramenta completa para Designers e Social Media. Converta e otimize imagens para Web (WebP) ou Redes Sociais (JPG) com ajustes inteligentes de fundo e qualidade.",
      is_premium: "0",
      path: "/addons/otimizador-de-imagem",
      folder: "otimizador-de-imagem"
    },
    {
      name: "Gerador de VCard",
      slug: "gerador-vcard",
      description: "Crie QR Codes de contato (vCard) com facilidade. Gere arquivos .vcf e transforme-os em QR Codes para compartilhar seus dados de contato.",
      is_premium: "0",
      path: "/addons/Gerador-de -VCard",
      folder: "Gerador-de -VCard"
    },
    {
      name: "Gerador de QR Code",
      slug: "gerador-qrcode",
      description: "Gere QR Codes de alta qualidade em formato SVG. Customize cores, fundo e margem. Download direto para seus projetos.",
      is_premium: "0",
      path: "/addons/Gerador-de-QRrCode",
      folder: "Gerador-de-QRrCode"
    },
    {
      name: "Limpador e Formatador de Texto",
      slug: "limpador-e-formatador-de-texto",
      description: "Utilitário para higienização rápida de textos.",
      is_premium: "0",
      path: "/addons/limpador-e-formatador-de-texto",
      folder: "limpador-e-formatador-de-texto"
    },
    {
      name: "Contador de Palavras e Tempo de Leitura",
      slug: "contador-de-palavras-e-tempo-de-leitura",
      description: "Contagem em tempo real de caracteres, palavras e estimativa de tempo de leitura.",
      is_premium: "0",
      path: "/addons/contador-de-palavras-e-tempo-de-leitura",
      folder: "contador-de-palavras-e-tempo-de-leitura"
    },
    {
      name: "Calculadora de Hora Freelance",
      slug: "calculadora-de-hora-freelance",
      description: "Calculadora financeira para profissionais autônomos descobrirem o valor da sua hora.",
      is_premium: "0",
      path: "/addons/calculadora-de-hora-freelance",
      folder: "calculadora-de-hora-freelance"
    },
    {
      name: "Gerador de Links WhatsApp e UTMs",
      slug: "gerador-de-links-whatsapp-e-utms",
      description: "Utilitário para marketing e atendimento rápido com criação de link wa.me e UTMs.",
      is_premium: "0",
      path: "/addons/gerador-de-links-whatsapp-e-utms",
      folder: "gerador-de-links-whatsapp-e-utms"
    },
    {
      name: "Minificador e Formatador JSON",
      slug: "minificador-e-formatador-json",
      description: "Formatador e validador leve de arquivos e estruturas JSON com visualização em árvore.",
      is_premium: "0",
      path: "/addons/minificador-e-formatador-json",
      folder: "minificador-e-formatador-json"
    }
  ];

  // Ordena por nome
  addons.sort((a, b) => a.name.localeCompare(b.name));

  return addons;
}

export function getAddonIcon(addonName: string): string {
  const iconMap: Record<string, string> = {
    notas: "bi-sticky",
    bloco: "bi-sticky",
    vcard: "bi-person-card",
    qr: "bi-qr-code",
    carrossel: "bi-images",
    slice: "bi-images",
    post: "bi-images",
    grid: "bi-diagram-3",
    otimiz: "bi-image-alt",
    imagem: "bi-image-alt",
    gerador: "bi-tools"
  };

  const name = addonName.toLowerCase();
  for (const [keyword, icon] of Object.entries(iconMap)) {
    if (name.includes(keyword)) {
      return icon;
    }
  }

  return "bi-box-seam";
}
