<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $stmt = $pdo->query('SELECT * FROM orcamentos ORDER BY updated_at DESC, id DESC');
  $rows = $stmt->fetchAll();
  foreach ($rows as &$row) { $row['itens'] = json_decode($row['itens'], true) ?: []; }
  respond(['data' => $rows]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error' => 'Método não permitido.'], 405);
$data = body();
$required = ['cliente', 'itens', 'total'];
foreach ($required as $field) if (!array_key_exists($field, $data)) respond(['error' => "Campo obrigatório: {$field}"], 422);

$sql = 'INSERT INTO orcamentos (os, cliente, telefone, responsavel, pagamento, descricao, markup, deslocamento, status, itens, total) VALUES (:os, :cliente, :telefone, :responsavel, :pagamento, :descricao, :markup, :deslocamento, :status, :itens, :total)';
$stmt = $pdo->prepare($sql);
$stmt->execute([
  ':os' => $data['os'] ?? null,
  ':cliente' => trim((string)$data['cliente']),
  ':telefone' => $data['phone'] ?? null,
  ':responsavel' => $data['responsible'] ?? null,
  ':pagamento' => $data['payment'] ?? null,
  ':descricao' => $data['description'] ?? null,
  ':markup' => (float)($data['markup'] ?? 30),
  ':deslocamento' => (float)($data['travel'] ?? 0),
  ':status' => $data['status'] ?? 'Rascunho',
  ':itens' => json_encode($data['items'], JSON_UNESCAPED_UNICODE),
  ':total' => (float)$data['total'],
]);
respond(['success' => true, 'id' => (int)$pdo->lastInsertId()], 201);

respond(['error' => 'Rota inválida.'], 404);
