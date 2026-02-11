import type { NextPage } from 'next'
import Head from 'next/head'
import { getAvailableAddons, getAddonIcon } from '@/lib/addons-loader'
import '@/styles/globals.css'

const Home: NextPage = () => {
  const addons = getAvailableAddons();

  return (
    <>
      <Head>
        <title>Fábrica de Addons - Ferramentas Digitais</title>
        <meta name="description" content="Plataforma de addons web minimalista" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </Head>

      {/* Navbar */}
      <nav className="navbar-custom">
        <div className="navbar-container">
          <a href="/" className="navbar-brand">
            <i className="bi bi-puzzle"></i> Fábrica de Addons
          </a>
          <span className="navbar-text">
            Desenvolvido por <a href="https://michaelbarnabe.site" target="_blank" rel="noopener noreferrer">michaelbarnabe.site</a>
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Suas Ferramentas Digitais, Automatizadas</h1>
          <p>Agilize seus processos com nossos addons inovadores</p>
        </div>
      </section>

      {/* Addons Grid */}
      <section className="addons-section">
        <div className="container">
          <h2>Explore Nossos Addons</h2>

          {addons.length > 0 ? (
            <>
              <p className="addons-count">
                <strong>{addons.length}</strong> addon{addons.length !== 1 ? 's' : ''} disponível{addons.length !== 1 ? 's' : ''}
              </p>

              <div className="addons-grid">
                {addons.map((addon) => (
                  <a
                    key={addon.slug}
                    href={`${addon.path}/index.html`}
                    className="addon-card"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="addon-icon">
                      <i className={`bi ${getAddonIcon(addon.name)}`}></i>
                    </div>
                    <h5>{addon.name}</h5>
                    <p>{addon.description}</p>
                    <span className="addon-button">Usar Addon →</span>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <div className="alert-info">
              <i className="bi bi-info-circle"></i> Nenhum addon disponível no momento. Volte em breve!
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-custom">
        <div className="container">
          <p>&copy; 2026 Fábrica de Addons. Desenvolvido por <a href="https://michaelbarnabe.site" target="_blank" rel="noopener noreferrer">michaelbarnabe.site</a></p>
          <small>Todos os direitos reservados.</small>
        </div>
      </footer>

      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      <script>{`if (typeof window !== 'undefined') { AOS.init({ duration: 800 }); }`}</script>
    </>
  )
}

export default Home
