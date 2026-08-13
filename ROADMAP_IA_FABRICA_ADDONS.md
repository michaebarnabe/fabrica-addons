# Plano de Execução e Desenvolvimento - Fábrica Addons

Este documento é o roadmap de refatoração, melhorias e implementação de novas funcionalidades para o portal **Fábrica Addons** (Next.js + TypeScript). As tarefas estão organizadas sequencialmente em 4 etapas estratégicas para consumo por assistentes de IA e desenvolvedores.

---

## 🛠 Visão Geral da Arquitetura
* **Framework Principal:** Next.js (TypeScript)
* **Arquitetura de Addons:** Aplicações client-side isoladas em `/public/addons/<addon-name>/`
* **Integração:** Carregamento dinâmico via `iframe` através de `lib/addons-loader.ts` e endpoint API `/pages/api/addons.ts`

---

## 📌 Etapa 1: Infraestrutura de Doações (Privacidade PF)

### Objetivos
Permitir o recebimento de doações financeiras para manutenção do servidor e desenvolvimento, garantindo 100% de privacidade dos dados pessoais (CPF, endereço e nome completo).

### Tarefas de Implementação
1. **Criação do Componente de Doação (`components/DonationModal.tsx` ou `components/DonationSection.tsx`):**
   * Desenvolver um modal ou seção de footer retrátil e responsiva para doações.
   * Exibir opções de apoio financeiro sem exposição de dados PF:
     * **Chave Pix Aleatória (EVP):** Exibir QR Code + botão "Copia e Cola" da chave EVP.
     * **Plataformas de Intermediação:** Links diretos para *Livepix*, *Buy Me a Coffee* ou *Kofi*.
     * **Criptomoedas:** Endereço de carteira USDT (Network TRC-20 / BEP-20) com botão para copiar chave pública.
2. **Integração no Layout:**
   * Adicionar um botão discreto de apoio ("Apoie o Projeto" / "Pague um Café") no cabeçalho ou rodapé do portal principal.

---

## 📌 Etapa 2: Correção e Atualização do Addon Instagram (`post-slice-grid`)

### Objetivos
Corrigir a proporção e o algoritmo de corte de imagens para redes sociais, garantindo suporte nativo ao padrão atual do Feed do Instagram.

### Problema Identificado
O script atual em `public/addons/post-slice-grid/index.js` realiza o fatiamento sem forçar a proporção padrão do Instagram (4:5 / 1080×1350 px), resultando em imagens cortadas ou distorcidas nas bordas do feed.

### Tarefas de Implementação
1. **Atualizar `public/addons/post-slice-grid/index.html`:**
   * Adicionar seletor de aspecto/formato no formulário:
     * `Feed Vertical (4:5 - 1080x1350px)` *(Padrão Recomendado)*
     * `Feed Quadrado (1:1 - 1080x1080px)`
2. **Reescrever o algoritmo em `public/addons/post-slice-grid/index.js`:**
   * Ajustar o cálculo do Canvas com a função de redimensionamento proporcional do tipo `cover` para evitar esticar ou achatar a imagem.
   * Fatiar a imagem final gerando matrizes exatas de **1080×1350 px** por bloco.

```javascript
// Trecho de referência para a IA implementar em public/addons/post-slice-grid/index.js
const ASPECT_RATIOS = {
  PORTRAIT: { width: 1080, height: 1350, ratio: 0.8 }, // 4:5
  SQUARE: { width: 1080, height: 1080, ratio: 1.0 }    // 1:1
};

function processImageSlice(imgElement, cols, rows, targetAspect = 'PORTRAIT') {
  const config = ASPECT_RATIOS[targetAspect];
  const sliceW = config.width;
  const sliceH = config.height;
  
  const totalTargetW = sliceW * cols;
  const totalTargetH = sliceH * rows;
  
  // Cálculo de Object-Fit: Cover no Canvas
  const imgRatio = imgElement.width / imgElement.height;
  const targetRatio = totalTargetW / totalTargetH;
  
  let drawW, drawH, offsetX, offsetY;
  if (imgRatio > targetRatio) {
    drawH = totalTargetH;
    drawW = totalTargetH * imgRatio;
    offsetX = (totalTargetW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = totalTargetW;
    drawH = totalTargetW / imgRatio;
    offsetX = 0;
    offsetY = (totalTargetW - drawH) / 2;
  }
  
  // Gerar fatias no Canvas
  const slices = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const canvas = document.createElement('canvas');
      canvas.width = sliceW;
      canvas.height = sliceH;
      const ctx = canvas.getContext('2d');
      
      const srcX = (c * sliceW - offsetX) * (imgElement.width / drawW);
      const srcY = (r * sliceH - offsetY) * (imgElement.height / drawH);
      const srcW = sliceW * (imgElement.width / drawW);
      const srcH = sliceH * (imgElement.height / drawH);
      
      ctx.drawImage(imgElement, srcX, srcY, srcW, srcH, 0, 0, sliceW, sliceH);
      slices.push(canvas.toDataURL('image/jpeg', 0.95));
    }
  }
  return slices;
}
```

---

## 📌 Etapa 3: SEO para Buscadores (Google) e IAs (LLMs / SearchGPT)

### Objetivos
Garantir a indexabilidade do portal em motores de busca e otimizar o conteúdo para inclusão em respostas sintéticas de LLMs (SearchGPT, Perplexity, Gemini, Claude).

### Tarefas de Implementação
1. **Refatoração de Rotas Dinâmicas no Next.js (`pages/addon/[slug].tsx` ou `pages/ferramentas/[slug].tsx`):**
   * Criar páginas individuais para cada utilitário para que cada um tenha sua própria URL limpa e indexável.
2. **Metadados Dinâmicos e Schemas JSON-LD:**
   * Adicionar Meta Tags únicas por ferramenta (`title`, `description`, `canonical`, `og:image`).
   * Injetar dados estruturados Schema.org (`WebApplication`):
     ```json
     {
       "@context": "https://schema.org",
       "@type": "WebApplication",
       "name": "Nome da Ferramenta",
       "operatingSystem": "All",
       "applicationCategory": "UtilitiesApplication",
       "offers": { "@type": "Offer", "price": "0" }
     }
     ```
3. **Seção de Conteúdo Semântico para LLMs:**
   * Inserir abaixo do container do `iframe` do utilitário um bloco de texto explicativo nativo em HTML contendo:
     * Resumo funcional e casos de uso da ferramenta.
     * Guia passo a passo ("Como usar").
     * Seção FAQ com perguntas frequentes usando tags semânticas (`<details>` e `<summary>`).
4. **Configuração do `robots.txt` e `sitemap.xml`:**
   * Garantir que crawlers de IA (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`) não estejam bloqueados.
   * Configurar a geração automática do `sitemap.xml` via rotas do Next.js.

---

## 📌 Etapa 4: Roadmap de Novos Addons (Foco em Produtividade)

### Arquitetura Obrigatória dos Novos Addons
* **Localização:** `/public/addons/<nome-do-addon>/`
* **Arquivos mínimos:** `index.html`, `index.js`, `manifest.json`, `package.json`, `README.md`
* **Execução:** 100% Client-Side no navegador (sem dependência de backend externo).

### Lista de Novos Utilitários a Serem Desenvolvidos

#### 1. `limpador-e-formatador-de-texto`
* **Descrição:** Utilitário para higienização rápida de textos.
* **Funcionalidades:**
  * Remover quebras de linha extras e espaços duplos.
  * Converter case (TUDO MAIÚSCULO, tudo minúsculo, Primeira Letra Maiúscula, Title Case).
  * Remover acentos e caracteres especiais.
  * Remover linhas duplicadas.

#### 2. `contador-de-palavras-e-tempo-de-leitura`
* **Descrição:** Ferramenta para redatores, estudantes e criadores de conteúdo.
* **Funcionalidades:**
  * Contagem em tempo real de caracteres (com e sem espaço), palavras, frases e parágrafos.
  * Estimativa de tempo de leitura falada e silenciosa.
  * Análise de densidade de palavras-chave mais repetidas.

#### 3. `calculadora-de-hora-freelance`
* **Descrição:** Calculadora financeira para profissionais autônomos.
* **Funcionalidades:**
  * Cálculo do valor/hora ideal baseado em: custos fixos mensais, dias trabalhados na semana, horas por dia, dias de férias desejados e margem de lucro/reserva técnica.
  * Exibição de resumo claro do faturamento mínimo necessário.

#### 4. `gerador-de-links-whatsapp-e-utms`
* **Descrição:** Utilitário para marketing e atendimento rápido.
* **Funcionalidades:**
  * Criação de link direto `wa.me` com mensagem padrão pré-preenchida e codificada (`encodeURIComponent`).
  * Construtor opcional de parâmetros UTM (`utm_source`, `utm_medium`, `utm_campaign`) para rastreamento no Google Analytics.

#### 5. `minificador-e-formatador-json`
* **Descrição:** Formatador e validador leve de arquivos e estruturas JSON.
* **Funcionalidades:**
  * Validação sintática de JSON com destaque de erros de sintaxe.
  * Formatação com identação configurável (2 espaços, 4 espaços ou tabulação).
  * Minificação instantânea (remover todos os espaços e quebras).
  * Visualizador em árvore retrátil (*tree-view*).

---

## 🚀 Orientações de Execução para a IA
1. Siga a ordem das Etapas (1 -> 2 -> 3 -> 4).
2. Não altere a estrutura de carregamento do `addons-loader.ts` a menos que seja necessário para otimizar as rotas do Next.js na Etapa 3.
3. Para cada novo Addon criado na Etapa 4, garanta que ele siga rigorosamente a estrutura de arquivos exigida e seja devidamente registrado na API de addons (`/pages/api/addons.ts`).
