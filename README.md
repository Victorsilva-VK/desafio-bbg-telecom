# Desafio Técnico - BBG Telecom

**Autor:** [Victor Silva Souza dos Santos](https://github.com/Victorsilva-VK)

**Data:** 15 de janeiro de 2026

---
Aplicação **Full Stack** para gerenciamento de tickets de suporte (chamados), desenvolvida como parte de um **desafio técnico**.

O projeto tem como objetivo demonstrar competências em **desenvolvimento web**, **arquitetura de software**, **boas práticas de código (Clean Code)**, **segurança**, **regras de negócio** e **integração entre backend e frontend**, simulando um cenário real de sistemas de helpdesk corporativos.

> **Status do Projeto:** Concluído ✅

---

## 🚀 Tecnologias Utilizadas

O projeto foi dividido em duas partes principais:

### Backend (API)

- **Node.js** com **TypeScript**: Para uma API robusta e tipada.
- **Express**: Framework para gerenciar rotas e requisições.
- **MySQL**: Banco de dados relacional.
- **Sequelize**: ORM para manipulação de dados e **Migrations**.
- **JWT (JSON Web Token)**: Para autenticação segura.

### Frontend (Interface)

- **React.js** com **Vite**: Para uma interface rápida e reativa.
- **Tailwind CSS**: Para estilização moderna e responsiva.
- **Axios**: Para consumo da API.
- **Context API**: Para gerenciamento de estado (Autenticação).

---

## 📋 Funcionalidades do Projeto

### Essenciais

- [x] **Gestão de Acesso:** Identificação de usuários (Cliente vs Técnico).
- [x] **Gestão de Tickets (CRUD):** Criação, Leitura, Atualização e Exclusão.
- [x] **Fluxo de Status:** Aberto → Em Progresso → Concluído.
- [x] **Priorização:** Classificação (Baixa, Média, Alta).

### Diferenciais Implementados

- [x] **Paginação:** Listagem de tickets otimizada (Backend e Frontend).
- [x] **Bloqueio de Edição:** Regra de negócio para chamados "Concluídos".
- [x] **Responsividade:** Layout adaptável (Mobile/Desktop).
- [x] **Arquitetura:** Separação clara de responsabilidades (MSC).

## 🧱 Estrutura do Projeto

**Estrutura do Backend:**

   ```text
   src/
   ├── controllers/  # Lida com as requisições e respostas (HTTP)
   ├── services/     # Contém toda a Lógica de Negócio e validações
   ├── repositories/ # Camada de acesso direto ao banco de dados
   ├── models/       # Definição das tabelas (Sequelize)
   ├── middlewares/  # Interceptadores (Autenticação JWT)
   └── routes/       # Definição dos endpoints da API
   ```

   **Estrutura do Frontend:**

   ```text
   src/
   ├── context/      # Gerenciamento de estado global (AuthContext)
   ├── pages/        # Telas da aplicação (Login e Dashboard)
   ├── services/     # Configuração do Axios e interceptors da API
   ├── types/        # Definições de tipagem TypeScript (Interfaces)
   ├── App.tsx       # Configuração de Rotas e componentes protegidos
   ├── main.tsx      # Ponto de entrada da aplicação React
   └── index.css     # Configuração global do Tailwind CSS
   ```


## ⚙️ Configuração e Execução do Backend

Siga os passos abaixo para colocar a API no ar.

### 1. Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [MySQL](https://www.mysql.com/)

### 2. Instalação das Dependências

Abra o terminal na pasta raiz do projeto e entre na pasta do servidor:

```bash
cd backend
npm install
```

### 3. Configuração do Banco de Dados

## A. Crie o Banco de Dados

```sql
CREATE DATABASE desafio_bbg;
```

## B.  Configure as Variáveis

Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

```bash
PORT=3000
JWT_SECRET=segredo_bbg_telecom

# Credenciais do MySQL (Ajuste conforme sua máquina)
DB_HOST=localhost
DB_USER=root
DB_PASS=SUA_SENHA_AQUI
DB_NAME=desafio_bbg
```

### 4. Criação das Tabelas (Migrations)

Com o banco configurado, execute o comando para criar as tabelas automaticamente:

```bash
npx sequelize-cli db:migrate
```

### 5. Executando a API

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponivel em <http://localhost:3000>

---

## 🖥️ Configuração e Execução do Frontend

**Importante:** Mantenha o terminal do Backend rodando. Abra um **novo terminal** para os passos abaixo.

### 1. Instalação

Volte à raiz do projeto (se necessário) e acesse a pasta do frontend:

```bash
cd frontend
npm install
```

### 2. Executando a Interface

Inicie o projeto React

```bash
npm run dev
```

A interface estará disponivel em <http://localhost:5173>

---

## ✏️ Credenciais para Teste

Como o banco de dados inicia vazio, você pode utilizar a rota de cadastro (`POST /users`) para criar os usuários abaixo, ou utilizar seus próprios dados.

**Sugestão de usuários para criação:**

| Perfil   | Nome Sugerido | E-mail            | Senha | Role (API) |
|----------|---------------|-------------------|-------|------------|
| Técnico  | Suporte TI    | `tecnico@teste.com` | `123`   | `TECNICO`  |
| Cliente  | Victor Silva    | `cliente@teste.com` | `123`   | `CLIENTE`  |

---

## 🔌 Documentação da API

### Autenticação

| Método | Rota      | Descrição                           |
| :---   | :---      | :---                                |
| `POST` | `/users`  | Cria um novo usuário (Cliente/Técnico) |
| `POST` | `/login`  | Autentica e retorna o **Token JWT** |

**Exemplo de JSON (Criar Usuário):**

```json
{
  "name": "Nome do Usuário",
  "email": "email@teste.com",
  "password": "123",
  "role": "TECNICO"
}
```

**Tickets (Chamados)**
⚠️ Atenção: Estas rotas exigem o Header `Authorization: Bearer <SEU_TOKEN>`.

| Método | Rota      | Descrição                           |
| :---   | :---      | :---                                |
| `POST`  | `/tickets`  | Cria um novo chamado |
| `GET` | `/tickets`  | Lista chamados (Suporta Paginação)    |
| `PUT`  | `/tickets/:id`  | Atualiza status ou dados do chamado |
| `DELETE`  | `/tickets/:id`  | Exclui um chamado |

**Paginação (Diferencial)**

Para testar a paginação, use os parâmetros na URL: `GET /tickets?page=1&limit=5`

---

## 🛡️ Regras de Negócio e Diferenciais

O projeto implementa rigorosamente os requisitos propostos no desafio técnico:

1. **Integridade (Regra de Negócio):**  
   O sistema bloqueia a edição de chamados que já possuem o status **CONCLUÍDO**, impedindo alterações no histórico finalizado.

2. **Arquitetura Limpa:**  
   Organização do código em camadas bem definidas (**Controllers**, **Services**, **Repositories**), promovendo separação de responsabilidades e facilidade de manutenção.

3. **Segurança:**  
   - Senhas armazenadas de forma segura utilizando **BCrypt**.  
   - Autenticação baseada em **JWT**, garantindo controle de acesso stateless.
   - Proteção de rotas sensíveis via **Middleware** de Autenticação.

4. **UX/UI:**  
   Interface responsiva e intuitiva, com feedback visual claro para melhorar a experiência do usuário.

## 📌 Considerações Finais

Este projeto foi desenvolvido com foco em boas práticas de desenvolvimento, clareza de código e aderência a cenários reais de sistemas de suporte técnico, podendo ser facilmente escalado, testado ou adaptado para novas funcionalidades.

O desafio cumpre seu objetivo ao demonstrar domínio técnico tanto no backend quanto no frontend, além de atenção às regras de negócio e segurança da aplicação.

---
