<div align="center">

# Sistema de Gestão de Clínica

Sistema fullstack para gerenciamento e agendamento de consultas médicas, desenvolvido com foco em controle de acesso baseado em perfis (RBAC).

![Status](https://img.shields.io/badge/status-concluído-green)
![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue.js-3-4FC08D?logo=vue.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-3ECF8E?logo=supabase&logoColor=white)

</div>

---

##  Descrição

O Sistema de Gestão de Clínica é uma aplicação web completa que permite o agendamento e gerenciamento de consultas médicas. O sistema conta com três perfis de usuário — **admin**, **médico** e **paciente** — cada um com permissões e funcionalidades específicas controladas por autenticação JWT e RBAC.

---

## Screenshots

| Login | Dashboard |
|-------|-----------|
| ![login] (<img width="1889" height="1005" alt="image" src="https://github.com/user-attachments/assets/117a6b9f-8bbd-4376-8033-306b0622f2fb" />
) | ![dashboard](<img width="1905" height="1008" alt="image" src="https://github.com/user-attachments/assets/2ed937c4-90a1-4b93-8704-7892838b1470" />
) |

| Agendamento | Minhas Consultas |
|-------------|-----------------|
| ![agendamento]() | ![consultas]() |

| Gestão de Médicos | Gestão de Clínicas |
|-------------------|-------------------|
| ![medicos]() | ![clinicas]() |

---

## Tecnologias

### Backend
- **Node.js** + **Express** — servidor e API REST
- **Supabase** (PostgreSQL) — banco de dados
- **JWT** (jsonwebtoken) — autenticação
- **bcrypt** — criptografia de senhas

### Frontend
- **Vue.js 3** (Composition API) — framework frontend
- **Pinia** — gerenciamento de estado global
- **Vue Router** — roteamento com guards de RBAC
- **Axios** — requisições HTTP
- **Tailwind CSS v4** — estilização

---

## ⚙️ Funcionalidades

### 👤 Autenticação
- [x] Registro de usuários com perfis (admin, médico, paciente)
- [x] Login com JWT
- [x] Persistência de sessão via localStorage
- [x] Controle de acesso baseado em perfis (RBAC)

### 📅 Consultas
- [x] Agendamento de consultas com calendário interativo
- [x] Slots de horário gerados automaticamente pela duração configurada
- [x] Validação de disponibilidade do médico por clínica
- [x] Verificação de conflito de horários
- [x] Verificação de bloqueios na agenda
- [x] Cancelamento de consultas
- [x] Listagem filtrada por perfil

### 🩺 Médicos (Admin)
- [x] Cadastro de médicos com credenciais de acesso
- [x] Gerenciamento de disponibilidade por clínica e dia da semana
- [x] Adição e remoção de horários disponíveis

### 🏥 Clínicas (Admin)
- [x] Cadastro de clínicas
- [x] Listagem de clínicas

### 📋 Regras de Negócio por Perfil

| Funcionalidade | Admin | Médico | Paciente |
|---|:---:|:---:|:---:|
| Agendar consulta | ✅ | ❌ | ✅ |
| Ver todas as consultas | ✅ | ❌ | ❌ |
| Ver próprias consultas | ✅ | ✅ | ✅ |
| Cancelar qualquer consulta | ✅ | ❌ | ❌ |
| Cancelar própria consulta | ✅ | ✅ | ✅ |
| Cadastrar médicos | ✅ | ❌ | ❌ |
| Gerenciar disponibilidade | ✅ | ✅* | ❌ |
| Cadastrar clínicas | ✅ | ❌ | ❌ |
| Bloquear agenda | ✅ | ❌ | ❌ |

_*Médico gerencia apenas a própria disponibilidade_

---

## 🗂️ Estrutura do Projeto

```
sistema-fullstack-clinica/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── consulta.controller.js
│   │   │   ├── medico.controller.js
│   │   │   ├── paciente.controller.js
│   │   │   ├── disponibilidade.controller.js
│   │   │   ├── bloqueio.controller.js
│   │   │   ├── clinica.controller.js
│   │   │   └── especialidade.controller.js
│   │   ├── services/
│   │   │   ├── usuario.service.js
│   │   │   ├── consulta.service.js
│   │   │   ├── medico.service.js
│   │   │   ├── paciente.service.js
│   │   │   ├── disponibilidade.service.js
│   │   │   ├── bloqueio.service.js
│   │   │   ├── clinica.service.js
│   │   │   └── especialidade.service.js
│   │   ├── repositories/
│   │   │   ├── usuario.repository.js
│   │   │   ├── consulta.repository.js
│   │   │   ├── medico.repository.js
│   │   │   ├── paciente.repository.js
│   │   │   ├── disponibilidade.repository.js
│   │   │   ├── bloqueio.repository.js
│   │   │   ├── clinica.repository.js
│   │   │   ├── especialidade.repository.js
│   │   │   └── perfil.repository.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── rbac.middleware.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.route.js
│   │   │   ├── consulta.route.js
│   │   │   ├── medico.route.js
│   │   │   ├── paciente.route.js
│   │   │   ├── disponibilidade.route.js
│   │   │   ├── bloqueio.route.js
│   │   │   ├── clinica.route.js
│   │   │   └── especialidade.route.js
│   │   ├── database/
│   │   │   └── supabase.js
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    └── sistema-clinica/
        ├── src/
        │   ├── assets/
        │   ├── components/
        │   │   ├── common/
        │   │   │   ├── Navbar.vue
        │   │   │   ├── BaseButton.vue
        │   │   │   ├── BaseInput.vue
        │   │   │   ├── BaseSelect.vue
        │   │   │   ├── AlertMessage.vue
        │   │   │   └── ModalForm.vue
        │   │   ├── consulta/
        │   │   │   └── CardConsulta.vue
        │   │   └── medico/
        │   │       └── CardMedico.vue
        │   ├── pages/
        │   │   ├── auth/
        │   │   │   ├── Login.vue
        │   │   │   └── Registro.vue
        │   │   ├── dashboard/
        │   │   │   └── Dashboard.vue
        │   │   ├── consultas/
        │   │   │   ├── Agendamento.vue
        │   │   │   └── MinhasConsultas.vue
        │   │   ├── medicos/
        │   │   │   └── Medicos.vue
        │   │   └── clinicas/
        │   │       └── Clinicas.vue
        │   ├── router/
        │   │   └── index.js
        │   ├── stores/
        │   │   ├── auth.store.js
        │   │   ├── consulta.store.js
        │   │   ├── medico.store.js
        │   │   ├── clinica.store.js
        │   │   ├── disponibilidade.store.js
        │   │   └── especialidade.store.js
        │   ├── services/
        │   │   └── api.js
        │   ├── App.vue
        │   └── main.js
        ├── package.json
        └── index.html
```

---

## 🗃️ Banco de Dados

O banco utiliza **PostgreSQL** via Supabase com as seguintes tabelas:

```
usuario          — dados de autenticação e perfil
perfil           — admin | medico | paciente
medico           — vinculado a usuario, possui CRM e especialidade
paciente         — vinculado a usuario, possui CPF
especialidade    — especialidades médicas
clinica          — unidades de atendimento
consulta         — agendamentos com status
disponibilidade_medico — horários disponíveis por médico e clínica
bloqueio_agenda  — períodos bloqueados na agenda do médico
```
### Modelo Relacional do Banco de Dados

<img width="807" height="590" alt="image" src="https://github.com/user-attachments/assets/b1bdfdb4-d6f0-4210-b747-79d15ec18d09" />

---

## ▶️ Como Executar

### Pré-requisitos
- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- Git

### 1. Clone o repositório

```bash
git clone git@github.com:NetoDev-J/sistema-fullstack-clinica.git
cd sistema-fullstack-clinica
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend/`:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_KEY=sua_chave_anon_aqui
```

Inicie o servidor:

```bash
node server.js
```

### 3. Configure o Frontend

```bash
cd frontend/sistema-clinica
npm install
npm run dev
```

### 4. Acesse o sistema

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

### 5. Primeiro acesso

Insira os perfis no banco via Supabase:

```sql
INSERT INTO perfil (nome) VALUES ('admin'), ('medico'), ('paciente');
```

Registre o primeiro admin via `POST /auth/registrar`:

```json
{
  "nome": "Admin",
  "email": "admin@clinica.com",
  "senha": "sua_senha",
  "perfil": "admin"
}
```

---

## 🔌 Endpoints da API

| Método | Rota | Perfis | Descrição |
|--------|------|--------|-----------|
| POST | `/auth/registrar` | público | Criar conta |
| POST | `/auth/login` | público | Login |
| GET | `/consultas` | todos | Listar consultas |
| POST | `/consultas` | paciente, admin | Agendar consulta |
| PATCH | `/consultas/:id/cancelar` | todos | Cancelar consulta |
| GET | `/medicos` | todos | Listar médicos |
| GET | `/clinicas` | todos | Listar clínicas |
| POST | `/clinicas` | admin | Criar clínica |
| GET | `/disponibilidades/:medico_id` | todos | Ver disponibilidade |
| POST | `/disponibilidades` | admin, medico | Criar disponibilidade |
| DELETE | `/disponibilidades/:medico_id/:id` | admin, medico | Remover disponibilidade |
| POST | `/bloqueios` | admin | Bloquear agenda |
| GET | `/especialidades` | todos | Listar especialidades |

---

## 👨‍💻 Autor
José Alves
