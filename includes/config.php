<?php
// includes/config.php

// 1. CONFIGURAÇÃO DA URL BASE
// Altere '/FABRICA ADDONS' para o nome da sua pasta no servidor local.
// Se o seu site estiver na raiz do domínio (ex: seusite.com), mude para ''.
define('BASE_URL', '/FABRICA ADDONS');

// 2. CONFIGURAÇÕES DO BANCO DE DADOS
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'usbw');
define('DB_NAME', 'fabricaaddonspro');

// 3. HABILITAR ERROS (APENAS EM DESENVOLVIMENTO)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>