# API PHP local

## Requisitos
- XAMPP, WAMP ou servidor PHP 8+
- MySQL/MariaDB com PDO MySQL habilitado
- phpMyAdmin para importar `schema.sql`

## Instalação
1. Copie `config.example.php` para `config.php`.
2. Ajuste usuário/senha do MySQL.
3. Importe `schema.sql` no phpMyAdmin.
4. Coloque a pasta `api` em `htdocs/rooted-orcamentos-api` (ou exponha-a pelo servidor PHP).
5. Teste `GET /orcamentos.php`.
6. Para gravar, envie `POST /orcamentos.php` com JSON contendo `cliente`, `itens` e `total`.

> Nunca publique `config.php` nem credenciais reais no GitHub. Em produção, substitua o CORS aberto por uma origem permitida e adicione autenticação.
