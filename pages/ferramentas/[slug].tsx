import Head from 'next/head';
import { getAvailableAddons, Addon } from '@/lib/addons-loader';
import React from 'react';

interface ToolPageProps {
  addon: Addon;
}

export default function ToolPage({ addon }: ToolPageProps) {
  if (!addon) {
    return <div>Ferramenta não encontrada</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": addon.name,
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": addon.description,
    "offers": { "@type": "Offer", "price": "0" }
  };

  return (
    <>
      <Head>
        <title>{addon.name} - Fábrica de Addons</title>
        <meta name="description" content={addon.description} />
        <link rel="canonical" href={`https://fabrica-addons.michaelbarnabe.site/ferramentas/${addon.slug}`} />
        <meta property="og:title" content={`${addon.name} - Fábrica de Addons`} />
        <meta property="og:description" content={addon.description} />
        {/* <meta property="og:image" content="..." /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
      </Head>

      {/* Navbar */}
      <nav className="navbar-custom">
        <div className="navbar-container">
          <a href="/" className="navbar-brand">
            <i className="bi bi-arrow-left"></i> Voltar para Home
          </a>
          <span className="navbar-text">
            {addon.name}
          </span>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1>{addon.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>{addon.description}</p>
        </div>

        {/* Addon Iframe */}
        <div style={{ border: '2px solid #000', borderRadius: '8px', overflow: 'hidden', height: '80vh', marginBottom: '3rem' }}>
          <iframe 
            src={`${addon.path}/index.html`} 
            style={{ width: '100%', height: '100%', border: 'none' }}
            title={addon.name}
          />
        </div>

        {/* SEO / LLM Context Area */}
        <section style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h2>Sobre esta Ferramenta</h2>
          <p>
            O <strong>{addon.name}</strong> é uma ferramenta utilitária desenhada para rodar 100% no seu navegador (client-side), garantindo privacidade e rapidez. 
            Nenhuma informação é enviada para servidores externos.
          </p>

          <h3 style={{ marginTop: '1.5rem' }}>Como Usar</h3>
          <p>
            Utilize a interface acima para interagir com a ferramenta. Todas as ações são processadas instantaneamente.
          </p>

          <h3 style={{ marginTop: '1.5rem' }}>FAQ (Perguntas Frequentes)</h3>
          <details style={{ marginBottom: '1rem', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 'bold' }}>Meus dados estão seguros?</summary>
            <p style={{ padding: '0.5rem 0', marginLeft: '1rem' }}>Sim, todo o processamento ocorre localmente no seu dispositivo. Não coletamos ou enviamos dados para nossos servidores.</p>
          </details>
          <details style={{ marginBottom: '1rem', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 'bold' }}>Esta ferramenta é gratuita?</summary>
            <p style={{ padding: '0.5rem 0', marginLeft: '1rem' }}>Sim, todas as ferramentas da Fábrica de Addons são 100% gratuitas.</p>
          </details>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-custom">
        <div className="container">
          <p>&copy; 2026 Fábrica de Addons. Desenvolvido por <a href="https://michaelbarnabe.site" target="_blank" rel="noopener noreferrer">michaelbarnabe.site</a></p>
        </div>
      </footer>
    </>
  );
}

export async function getStaticPaths() {
  const addons = getAvailableAddons();
  
  const paths = addons.map((addon) => ({
    params: { slug: addon.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const addons = getAvailableAddons();
  const addon = addons.find((a) => a.slug === params.slug);

  return {
    props: {
      addon,
    },
  };
}
