<?php
require 'includes/config.php';
require 'includes/addons-loader.php';

$addons = getAvailableAddons();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fábrica de Addons - Ferramentas Digitais</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: #ffffff;
            color: #000000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        /* Navbar */
        .navbar-custom {
            background-color: #ffffff;
            border-bottom: 2px solid #000000;
            box-shadow: none;
            padding: 1rem 0;
        }
        
        .navbar-custom .navbar-brand {
            font-size: 1.5rem;
            font-weight: 700;
            color: #000000;
        }
        
        .navbar-custom .navbar-text {
            font-size: 0.9rem;
            color: #000000;
        }
        
        .navbar-custom a {
            color: #000000;
            text-decoration: none;
            font-weight: 500;
        }
        
        .navbar-custom a:hover {
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
            color: #ffffff;
        }
        
        .hero-section p {
            font-size: 1.25rem;
            opacity: 0.95;
            margin-bottom: 2rem;
            color: #ffffff;
        }
        
        /* Addons Section */
        .addons-section {
            padding: 4rem 2rem;
            background-color: #ffffff;
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
        
        /* Addon Cards */
        .addon-card {
            background: #ffffff;
            border: 2px solid #000000;
            border-radius: 0;
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
            text-decoration: none;
            color: inherit;
            background-color: #f0f0f0;
        }
        
        .addon-icon {
            width: 64px;
            height: 64px;
            background: #000000;
            border-radius: 0;
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
            border-radius: 0;
            text-decoration: none;
            display: inline-block;
            transition: all 0.2s ease;
            align-self: flex-start;
            font-size: 0.95rem;
            font-weight: 600;
        }
        
        .addon-button:hover {
            background-color: #ffffff;
            color: #000000;
            text-decoration: none;
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
            
            .addons-section {
                padding: 2rem 1rem;
            }
        }
    </style>
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-custom sticky-top">
    <div class="container">
        <a class="navbar-brand" href="<?php echo BASE_URL; ?>/index.php">
            <i class="bi bi-puzzle"></i> Fábrica de Addons
        </a>
        <span class="navbar-text ms-auto">
            Desenvolvido por <a href="https://michaelbarnabe.site" target="_blank">michaelbarnabe.site</a>
        </span>
    </div>
</nav>

<!-- Hero Section -->
<section class="hero-section">
    <div class="container">
        <h1>Suas Ferramentas Digitais</h1>
        <p>Agilize seus processos com as nossas micro ferramentas</p>
    </div>
</section>

<!-- Addons Grid -->
<section class="addons-section">
    <div class="container">
        <h2>Explore Nossos Addons</h2>
        
        <?php if (count($addons) > 0): ?>
            <p class="addons-count"><strong><?php echo count($addons); ?></strong> addon<?php echo count($addons) !== 1 ? 's' : ''; ?> disponível<?php echo count($addons) !== 1 ? 's' : ''; ?></p>
            
            <div class="row g-4">
                <?php foreach ($addons as $addon): ?>
                    <div class="col-lg-4 col-md-6" data-aos="fade-up">
                        <a href="<?php echo BASE_URL; ?>/addons/<?php echo htmlspecialchars($addon['folder']); ?>/index.html" 
                           class="addon-card" target="_blank">
                            <div class="addon-icon">
                                <i class="bi <?php echo getAddonIcon($addon['name']); ?>"></i>
                            </div>
                            <h5><?php echo htmlspecialchars($addon['name']); ?></h5>
                            <p><?php echo htmlspecialchars($addon['description']); ?></p>
                            <span class="addon-button">Usar Addon →</span>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <div class="alert alert-info text-center">
                <i class="bi bi-info-circle"></i> Nenhum addon disponível no momento. Volte em breve!
            </div>
        <?php endif; ?>
    </div>
</section>

<!-- Footer -->
<footer class="footer-custom">
    <div class="container">
        <p>&copy; 2026 Fábrica de Addons. Desenvolvido por <a href="https://michaelbarnabe.site" target="_blank">michaelbarnabe.site</a></p>
        <small>Todos os direitos reservados.</small>
    </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
    AOS.init({ duration: 800 });
</script>

</body>
</html>
