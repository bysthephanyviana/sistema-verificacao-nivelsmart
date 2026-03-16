# Sistema de Verificação de Técnicos - NivelSmart

Microserviço para validação de autenticidade de técnicos através de QR Code.

## 🚀 Funcionalidades

- **Página Pública de Validação:** Acessível via `/verificacao/:id`, otimizada para smartphones.
- **Painel Administrativo:** Gestão de técnicos (CRUD).
- **QR Code Automático:** Geração de QR Code para cada técnico com download direto do painel.
- **Status em Tempo Real:** Validação visual (Verde/Vermelho) baseada no status do técnico (ATIVO/INATIVO).
- **Upload de Fotos:** Gestão de identidade visual dos colaboradores.

## 🛠️ Tecnologias

- **Backend:** Node.js, Express.
- **Banco de Dados:** PostgreSQL.
- **Frontend:** EJS, CSS Vanilla.
- **Libs Principais:** `qrcode`, `multer`, `pg`, `dotenv`.

## 📦 Instalação

1. Clone o repositório.
2. No diretório raiz, execute:
   ```bash
   npm install
   ```
3. Renomeie o arquivo `.env.example` para `.env` e preencha com suas credenciais do PostgreSQL.
4. Execute o script SQL contido em `src/database/schema.sql` no seu banco de dados.

## 🚀 Como Rodar

```bash
node src/server.js
```
Acesse: `http://localhost:3000`

## ☁️ Deploy (Cloud)

O sistema está preparado para deploy em plataformas como Render ou Railway:
- O banco de dados utiliza SSL configurado (`src/config/database.js`).
- As variáveis de ambiente devem ser configuradas no painel da hospedagem.

## 📄 Créditos
NivelSmart - Tecnologia em Monitoramento Inteligente.
