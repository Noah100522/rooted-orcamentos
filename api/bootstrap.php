<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
  http_response_code(500);
  echo json_encode(['error' => 'Crie api/config.php usando config.example.php.']);
  exit;
}

$config = require $configPath;
try {
  $pdo = new PDO(
    sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $config['host'], $config['port'], $config['database']),
    $config['username'],
    $config['password'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
  );
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Não foi possível conectar ao MySQL.', 'details' => $e->getMessage()]);
  exit;
}

function body(): array {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw ?: '{}', true);
  return is_array($data) ? $data : [];
}

function respond(array $data, int $status = 200): never {
  http_response_code($status);
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}
