# Sistema de Gerenciamento de Clientes

Este é um sistema de gerenciamento de clientes com backend em Node.js e PostgreSQL, e frontend em React.

- [Requisitos e Principais Feramentas](#requisitos-e-principais-ferramentas)
- [Ferranbtas](#requisitos)
- [Implementação](#implementação)
  - [Passo 1 : Configuração do Banco de Dados](#passo-1--configuração-do-banco-de-dados)
  - [Passo 2 : Configuração do Backend](#passo-2--configuração-do-backend)
  - [Passo 2 : Configuração do Frontend](#passo-3--configuração-do-frontend)
- [Rotas da Api](#rotas-da-api)

## Requisitos e Principais Ferramentas

- React 18.2.0
- Vite 5.1.4
- Material UI 5.15.12
- Node.js 20.11.0
- Typescript 5.4.2
- PostgreSQL

## Implementação

### Passo 1 : Configuração do Banco de Dados

1. Instale o PostgreSQL em seu sistema.
2. Crie um banco de dados chamado `gerenciamento_clientes`.

```sql
CREATE DATABASE gerenciamento_clientes;
```

3. Execute o DDL para criar a tabela de clientes.

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

### Passo 2 : Configuração do Backend

1. Navegue até o diretório `backend`:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` com as seguintes informações:

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

### Passo 3 : Configuração do Frontend

1. Navegue até o diretório `frontend`:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o frontend:

```bash
npm run dev
```

O frontend estará disponível em http://localhost:5173.

### Rotas da Api

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ffranciscobressa%2Fteste-gerenciamento-clientes%2Fmain%2Fbackend%2FInsomnia_2024-03-09.json%3Ftoken%3DGHSAT0AAAAAACM5TKAF3YCIEXYNYHPQPEBQZPMRGAQ)

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
    }
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
  
#### 2. Deletar Usuário

- **Endpoint:** `DELETE /users/:id`
- **Descrição:** Deleta um usuário pelo ID.
- **Parâmetros da Solicitação (Request Parameters):**
  ```json
    {id}: O ID do usuário a ser excluído.
  ```
- **Exemplo de Solicitação:**
  ```bash
  DELETE /users/1
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
