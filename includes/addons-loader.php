<?php
/**
 * addons-loader.php
 * Carrega todos os addons disponíveis no diretório
 */

function getAvailableAddons() {
    $addonsDir = __DIR__ . '/../addons';
    $addons = [];
    
    if (is_dir($addonsDir)) {
        $dirs = array_diff(scandir($addonsDir), ['.', '..']);
        
        foreach ($dirs as $dir) {
            $dirPath = $addonsDir . '/' . $dir;
            
            // Verifica se é diretório
            if (!is_dir($dirPath)) continue;
            
            // Tenta carregar manifest.json ou package.json
            $manifestPath = $dirPath . '/manifest.json';
            $packagePath = $dirPath . '/package.json';
            
            $addonData = null;
            
            if (file_exists($manifestPath)) {
                $addonData = json_decode(file_get_contents($manifestPath), true);
            } elseif (file_exists($packagePath)) {
                $packageData = json_decode(file_get_contents($packagePath), true);
                $addonData = [
                    'name' => $packageData['name'] ?? $dir,
                    'slug' => strtolower(str_replace(' ', '-', $packageData['name'] ?? $dir)),
                    'description' => $packageData['description'] ?? 'Addon sem descrição',
                    'version' => $packageData['version'] ?? '1.0.0'
                ];
            }
            
            if ($addonData) {
                $addonData['path'] = '/addons/' . $dir;
                $addonData['folder'] = $dir;
                $addons[] = $addonData;
            }
        }
    }
    
    // Ordena por nome
    usort($addons, function($a, $b) {
        return strcmp($a['name'] ?? '', $b['name'] ?? '');
    });
    
    return $addons;
}

function getAddonIcon($addonName) {
    // Mapeia ícones por tipo de addon
    $iconMap = [
        'vcard' => 'bi-person-card',
        'qr' => 'bi-qr-code',
        'carrossel' => 'bi-images',
        'slice' => 'bi-images',
        'post' => 'bi-images',
        'grid' => 'bi-diagram-3',
        'otimiz' => 'bi-image-alt',
        'imagem' => 'bi-image-alt',
        'gerador' => 'bi-tools'
    ];
    
    $name = strtolower($addonName);
    foreach ($iconMap as $keyword => $icon) {
        if (strpos($name, $keyword) !== false) {
            return $icon;
        }
    }
    
    return 'bi-box-seam';
}
?>