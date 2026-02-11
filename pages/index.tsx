import type { NextPage } from 'next'
import Head from 'next/head'
import { getAvailableAddons, getAddonIcon } from '@/lib/addons-loader'

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

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          background-color: #ffffff;
          color: #000000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        body {
          line-height: 1.5;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        /* Navbar */
        .navbar-custom {
          background-color: #ffffff;
          border-bottom: 2px solid #000000;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: #000000;
        }

        .navbar-text {
          font-size: 0.9rem;
          color: #000000;
        }

        .navbar-text a {
          color: #000000;
          font-weight: 500;
          text-decoration: none;
        }

        .navbar-text a:hover {
          text-decoration: underline;
        }

        /* Hero Section */
        .hero-section {
          background: #000000;
          color: #ffffff;
          padding: 5rem 2rem;
          text-align: center;
        }

        .hero-section h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .hero-section p {
          font-size: 1.25rem;
          opacity: 0.95;
        }

        /* Addons Section */
        .addons-section {
          padding: 4rem 2rem;
          background-color: #ffffff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .addons-section h2 {
          text-align: center;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #000000;
        }

        .addons-count {
          text-align: center;
          color: #000000;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .addons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        /* Addon Cards */
        .addon-card {
          background: #ffffff;
          border: 2px solid #000000;
          padding: 2rem;
          height: 100%;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
        }

        .addon-card:hover {
          border-color: #000000;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          transform: translateY(-4px);
          background-color: #f0f0f0;
        }

        .addon-icon {
          width: 64px;
          height: 64px;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .addon-card h5 {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #000000;
          font-size: 1.1rem;
        }

        .addon-card p {
          font-size: 0.95rem;
          color: #333333;
          margin-bottom: 1.5rem;
          flex-grow: 1;
          line-height: 1.5;
        }

        /* Addon Button */
        .addon-button {
          background-color: #000000;
          color: #ffffff;
          border: 2px solid #000000;
          padding: 0.6rem 1.2rem;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s ease;
          align-self: flex-start;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
        }

        .addon-button:hover {
          background-color: #ffffff;
          color: #000000;
          border-color: #000000;
        }

        /* Footer */
        .footer-custom {
          background-color: #000000;
          color: #ffffff;
          padding: 2rem;
          text-align: center;
          margin-top: 5rem;
          border-top: 2px solid #000000;
        }

        .footer-custom p {
          margin: 0;
          color: #ffffff;
        }

        .footer-custom small {
          color: #cccccc;
        }

        .footer-custom a {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
        }

        .footer-custom a:hover {
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .hero-section p {
            font-size: 1rem;
          }

          .navbar-container {
            flex-direction: column;
            gap: 0.5rem;
          }

          .addons-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

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
            <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
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
      <script>{`AOS.init({ duration: 800 });`}</script>
    </>
  )
}

export default Home
