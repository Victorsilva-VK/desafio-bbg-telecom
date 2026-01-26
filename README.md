# HelpDesk Manager - Sistema de Gestão de Chamados

![Badge License](https://img.shields.io/badge/license-MIT-green)
![Badge Status](https://img.shields.io/badge/status-concluído-brightgreen)
![Badge Version](https://img.shields.io/badge/version-1.0.0-blue)

Uma aplicação **Full Stack** robusta para o gerenciamento de tickets de suporte técnico.
Este projeto foi desenvolvido com foco em **Arquitetura de Software**, **Clean Code** e **Segurança**, simulando um ambiente real de atendimento corporativo com controle de acesso baseado em cargos (RBAC).

---

## 📸 Visão Geral

O sistema permite que clientes abram solicitações de suporte e acompanhem o status em tempo real, enquanto a equipe técnica gerencia, prioriza e soluciona esses chamados através de uma interface administrativa intuitiva.

### Principais Funcionalidades

- **🔐 Controle de Acesso (RBAC):** Login seguro com diferenciação automática de permissões entre `Cliente` e `Técnico`.
- **🎫 Ciclo de Vida do Ticket:** Fluxo completo de atendimento (Aberto → Em Progresso → Concluído).
- **🛡️ Integridade de Dados:** Regras de negócio estritas que garantem a imutabilidade de históricos finalizados.
- **⚡ Performance:** Listagem otimizada com paginação no Backend e Frontend.
- **📱 Responsividade:** Interface adaptável construída com Tailwind CSS (Mobile First).

---

## 🛠️ Stack Tecnológico

O projeto utiliza tecnologias modernas e amplamente adotadas no mercado:

### Backend (API RESTful)
- **Runtime:** Node.js
- **Linguagem:** TypeScript (Tipagem estática para maior segurança)
- **Framework:** Express
- **Banco de Dados:** MySQL
- **ORM:** Sequelize (com Migrations e Seeders)
- **Autenticação:** JWT (JSON Web Token) + Bcrypt
- **Arquitetura:** MSC (Model-Service-Controller)

### Frontend (SPA)
- **Framework:** React.js + Vite
- **Estilização:** Tailwind CSS
- **HTTP Client:** Axios (com Interceptors para gestão de Token)
- **Estado Global:** Context API
- **Roteamento:** React Router DOM (com proteção de rotas privadas)

---

## 🏗️ Arquitetura do Projeto

O código foi estruturado seguindo princípios de **Clean Architecture** para garantir escalabilidade e fácil manutenção.

```text
├── backend/
│   ├── src/
│   │   ├── controllers/  # Camada de Interface (HTTP)
│   │   ├── services/     # Camada de Regras de Negócio
│   │   ├── repositories/ # Camada de Acesso a Dados (Pattern Repository)
│   │   ├── models/       # Definição de Entidades
│   │   └── middlewares/  # Interceptadores (Segurança/Validação)
│
├── frontend/
│   ├── src/
│   │   ├── context/      # Gestão de Sessão e Autenticação
│   │   ├── services/     # Configuração de API
│   │   └── pages/        # Telas da Aplicação
```

---

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar a aplicação localmente.

### Pré-requisitos
- Node.js (v16+)
- MySQL

### 1. Configurando o Backend (API)

```bash
# 1. Entre na pasta do servidor
cd backend

# 2. Instale as dependências
npm install

# 3. Configure o Banco de Dados
# Crie um banco MySQL chamado 'helpdesk_db' (ou altere no .env)
# Crie um arquivo .env na raiz do backend com suas credenciais:
# PORT=3000
# DB_USER=root
# DB_PASS=sua_senha
# DB_NAME=helpdesk_db
# JWT_SECRET=sua_chave_segura

# 4. Execute as Migrations (Criação de Tabelas)
npx sequelize-cli db:migrate

# 5. Inicie o Servidor
npm run dev
```

### 2. Configurando o Frontend (Interface)

```bash
# 1. Em um novo terminal, entre na pasta web
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie a aplicação
npm run dev
```

Acesse: http://localhost:5173

---

## 🧪 Credenciais de Demonstração

Para testar as diferentes visões do sistema, utilize os usuários abaixo (ou crie novos via API):

| Perfil | E-mail | Senha Padrão | Permissões |
|--------|--------|--------------|-----------|
| Técnico | tecnico@demo.com | 123 | Gerenciar tickets, Alterar status |
| Cliente | cliente@demo.com | 123 | Abrir chamados, Visualizar histórico |

**Nota:** É necessário cadastrar esses usuários via rota `POST /users` na primeira execução.

---

## 🔌 Documentação da API

Principais endpoints disponíveis:

| Recurso | Método | Endpoint | Descrição |
|---------|--------|----------|-----------|
| Auth | POST | /login | Autenticação e emissão de Token |
| Users | POST | /users | Cadastro de usuários |
| Tickets | POST | /tickets | Abertura de chamado |
| Tickets | GET | /tickets | Listagem (Suporta ?page=1&limit=10) |
| Tickets | PUT | /tickets/:id | Atualização de Status/Prioridade |

---

## 👨‍💻 Autor

Desenvolvido por **Victor Silva Souza dos Santos**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Victorsilva-VK)
