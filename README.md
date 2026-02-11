# Fábrica de Addons - Next.js

Uma plataforma simples e minimalista para disponibilizar addons web sem necessidade de autenticação. Agora em **Next.js** com deploy automático no **Vercel**.

## 🎯 Características

- ✅ **Sem Login Necessário** - Acesso público direto aos addons
- ✅ **Carregamento Dinâmico** - Addons carregados automaticamente
- ✅ **Design Minimalista** - Branco e preto, limpo e profissional
- ✅ **Responsivo** - Funciona em desktop, tablet e mobile
- ✅ **Next.js + React** - Framework moderno e rápido
- ✅ **TypeScript** - Código type-safe
- ✅ **Deploy Vercel** - Hospedagem gratuita e automática

## 📦 Addons Disponíveis

1. **Cortador de Imagens para Carrossel** - Corte automaticamente imagens para carrosseis do Instagram
2. **Otimizador de Imagens Pro** - Converta e otimize imagens para Web (WebP) ou Redes Sociais (JPG)
3. **Gerador de VCard** - Crie QR Codes de contato (vCard) com facilidade
4. **Gerador de QR Code** - Gere QR Codes em SVG customizáveis

## 🚀 Como Instalar

### Requisitos
- PHP 7.0 ou superior
- Servidor web (Apache, Nginx, etc)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/michaelbarnabe/fabrica-addons.git
cd fabrica-addons
```

2. Ajuste o `BASE_URL` em `includes/config.php` conforme sua instalação:
```php
define('BASE_URL', '/fabrica-addons');  // ou apenas '' se na raiz
```

3. Acesse via navegador:
```
http://localhost/fabrica-addons
```

## 📁 Estrutura do Projeto

```
fabrica-addons/
├── index.php                      # Página principal
├── includes/
│   ├── config.php                # Configurações
│   └── addons-loader.php         # Carregador de addons
├── addons/                       # Pasta dos addons
│   ├── Gerador-de -VCard/
│   ├── Gerador-de-QRrCode/
│   ├── otimizador-de-imagem/
│   └── post-slice-grid/
├── assets/
│   └── images/                   # Imagens futuras
└── css/
    └── style.css                 # Estilos
```

## 🔧 Como Adicionar um Novo Addon

1. Crie uma pasta em `addons/seu-addon-name/`
2. Adicione o arquivo `index.html` com sua aplicação
3. Crie um arquivo `manifest.json` na raiz do addon:

```json
{
  "name": "Seu Addon",
  "slug": "seu-addon",
  "description": "Descrição breve do seu addon",
  "is_premium": "0"
}
```

4. Recarregue a página - seu addon aparecerá automaticamente!

## 🎨 Personalização de Ícones

Os ícones são carregados automaticamente baseado no nome do addon. Você pode editar a função `getAddonIcon()` em `includes/addons-loader.php` para adicionar mais mapeamentos.

Ícones disponíveis: https://icons.getbootstrap.com/

## 📝 Licença

MIT - Veja LICENSE.md

## 👤 Autor

Desenvolvido por [Michael Barnabe](https://michaelbarnabe.site)
- Email: michael.barnabe@live.com
- Website: https://michaelbarnabe.site

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

**Fábrica de Addons** - Automatize suas ferramentas digitais 🚀
