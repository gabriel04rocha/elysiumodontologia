# Webhook Server — Elysium Odontologia

Servidor Node.js/Express que recebe submissões do formulário de contato e repassa a webhooks cadastrados.

## Instalação local

```bash
cd webhook-server
npm install
cp .env.example .env
# Edite o .env com sua senha e JWT secret
npm start
```

## Variáveis de ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `PORT` | Porta do servidor | `3001` |
| `ADMIN_PASSWORD` | Senha do painel admin | `admin123` |
| `JWT_SECRET` | Segredo para assinar tokens | `changeme` |

> ⚠️ **Troque sempre** `ADMIN_PASSWORD` e `JWT_SECRET` em produção!

---

## Rotas

### Pública

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/submit` | Recebe formulário e dispara webhooks |

**Body `/submit`:**
```json
{
  "name": "João Silva",
  "phone": "(62) 99999-9999",
  "email": "joao@email.com",
  "message": "Gostaria de agendar..."
}
```

### Admin (necessita Bearer token)

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/admin/login` | Autentica e retorna JWT |
| `GET` | `/admin/webhooks` | Lista webhooks |
| `POST` | `/admin/webhooks` | Cadastra webhook |
| `PUT` | `/admin/webhooks/:id` | Atualiza webhook |
| `DELETE` | `/admin/webhooks/:id` | Remove webhook |
| `GET` | `/admin/submissions` | Lista submissões |

**Login:**
```bash
curl -X POST http://localhost:3001/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password": "sua_senha"}'
# retorna: {"token": "eyJ..."}
```

**Cadastrar webhook:**
```bash
curl -X POST http://localhost:3001/admin/webhooks \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://hooks.zapier.com/...", "name": "Zapier CRM"}'
```

---

## Deploy no cPanel

O cPanel com **Node.js Selector** usa o **Phusion Passenger** como runtime. O `server.js` exporta `module.exports = app` para compatibilidade.

### Passos:

1. **Acesse o cPanel → Node.js Selector**
2. Clique em **Create Application**
3. Configure:
   - **Node.js version**: 18+ (ou 20 LTS)
   - **Application mode**: `production`
   - **Application root**: `webhook-server` (pasta dentro do seu domínio/subdomínio)
   - **Application URL**: ex. `api.seudominio.com.br` ou `seudominio.com.br/api`
   - **Application startup file**: `server.js`
4. Em **Environment Variables**, adicione:
   - `ADMIN_PASSWORD` = sua senha segura
   - `JWT_SECRET` = string aleatória longa
   - `PORT` = a porta que o cPanel atribuir (geralmente automático via Passenger)
5. Clique **Create**
6. Faça upload dos arquivos da pasta `webhook-server/` (exceto `node_modules`) via File Manager
7. No painel da aplicação, clique **Run NPM Install**
8. Clique **Restart** para iniciar

### Subdomínio recomendado

Crie um subdomínio `api.elysiumodontologia.com.br` apontando para a pasta da aplicação.  
Configure o formulário no Next.js para enviar para `https://api.elysiumodontologia.com.br/submit`.

### Arquivo `.htaccess` (se necessário)

```apache
# Força o Passenger a processar todas as requests
PassengerEnabled on
PassengerAppType node
PassengerStartupFile server.js
```

### Dados persistidos

O servidor usa um arquivo `db.json` local (lowdb). Para produção com múltiplas instâncias, considere migrar para MySQL (disponível no cPanel via `mysql2` + `knex`).
