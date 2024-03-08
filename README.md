# API - Sistema de Gerenciamento de Clientes

Esta é a API do backend de gerenciamento de clientes feito com Node e Typescript

Você pode acessar o repositório do frontend em react clicando aqui.

## Configuração do Banco de Dados

1. Instale o PostgreSQL em seu sistema.
2. Crie um banco de dados chamado `gerenciamento_clientes`.
3. Execute o DDL para criar a tabela de users.
```sql
CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    coordenada_x INT,
    coordenada_y INT
);
```

## Configuração do Backend

1. Instale as dependências:

```bash
npm install
```

1. Configure as variáveis de ambiente criando um arquivo `.env` com as seguintes informações:

```plaintext
PORT=5000
DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=gerenciamento_clientes
DB_PORT=sua_porta
```

4. Execute o backend:

```bash
npm run start:dev
```

O backend estará disponível em http://localhost:5000.

### Documentação Endpoints

#### 1. Obter Usuários
- **Endpoint:** `GET /users`
- **Descrição:** Recupera uma lista de usuários com base em parâmetros de consulta opcionais.
- **Parâmetros de Consulta:**
  - `nome` (opcional): Nome do usuário para filtragem.
  - `email` (opcional): E-mail do usuário para filtragem.
  - `telefone` (opcional): Número de telefone do usuário para filtragem.
- **Exemplo de Solicitação:**
  ```bash
  GET /users?nome=John&email=john@example.com
  ```
- **Exemplo de Resposta:**
  ```json
  [
    {
      "id": 1,
      "nome": "John",
      "email": "john@example.com",
      "telefone": "+1234567890",
      "coordenada_x": 10,
      "coordenada_y": 20
    },
    // ... outros usuários
  ]
  ```

#### 2. Criar Usuário
- **Endpoint:** `POST /users`
- **Descrição:** Cria um novo usuário com as informações fornecidas.
- **Corpo da Solicitação (Request Body):**
  ```json
  {
    "nome": "John",
    "email": "john@example.com",
    "telefone": "+1234567890",
    "coordenada_x": 10,
    "coordenada_y": 20
  }
  ```
- **Exemplo de Solicitação:**
  ```bash
  POST /users
  {
    "nome": "John",
    "email": "john@example.com",
    "telefone": "+1234567890",
    "coordenada_x": 10,
    "coordenada_y": 20
  }
  ```
- **Exemplo de Resposta:**
  ```json
  {
    "id": 1,
    "nome": "John",
    "email": "john@example.com",
    "telefone": "+1234567890",
    "coordenada_x": 10,
    "coordenada_y": 20
  }
  ```
