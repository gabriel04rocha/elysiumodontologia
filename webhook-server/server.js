/**
 * Elysium Odontologia — Webhook Server
 * Recebe submissões do formulário e repassa para URLs cadastradas.
 * Adicionado: Integração OAuth com Kommo CRM.
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");

// ── Banco de dados local (JSON file) ──
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  webhooks: [],
  submissions: [],
  kommoAuth: {},
  kommoConfig: {}
}).write();

// ── App ──
const app = express();
// Habilita confiança no proxy (Dokploy/Traefik) para detectar HTTPS corretamente
app.set('trust proxy', 1);

// No Docker (Dokploy), usamos a 3000 como padrão interno.
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const KOMMO_CLIENT_ID = process.env.KOMMO_CLIENT_ID;
const KOMMO_CLIENT_SECRET = process.env.KOMMO_CLIENT_SECRET;

app.use(express.json());
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ── Base URL Middleware ──
// Remove '/api' caso o Passenger/Proxy ignore o rewrite nativo
app.use((req, res, next) => {
  const originalUrl = req.url;
  if (req.url.startsWith('/api/')) {
    req.url = req.url.replace('/api/', '/');
  } else if (req.url === '/api') {
    req.url = '/';
  }
  
  if (originalUrl !== req.url) {
    console.log(`Path rewritten: ${originalUrl} -> ${req.url}`);
  }
  next();
});

// Rota de Diagnóstico para confirmar versão
app.get("/version", (req, res) => {
  res.json({ 
    version: "1.0.2-prefix-fix", 
    timestamp: new Date().toISOString(),
    url: req.url,
    originalUrl: req.originalUrl || "n/a"
  });
});
// ── Rate limiter ──
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Muitas solicitações. Tente novamente em 15 minutos." },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: "Muitas tentativas de login." },
});

// ── Auth middleware ──
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token necessário." });
  }
  try {
    req.user = jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}

// ─────────────────────────────────────────────────────────
// ROTAS PÚBLICAS
// ─────────────────────────────────────────────────────────

/** GET / — health check */
app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "Elysium Webhook Server" });
});

/** GET /admin — admin interface */
app.get("/admin", (_req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

// ── Kommo Token Manager ──
async function getKommoToken() {
  let auth = db.get("kommoAuth").value();
  if (!auth || !auth.access_token) return null;
  
  // Renova se estiver perto da expiração
  if (auth.expires_at && Date.now() >= (auth.expires_at - 5 * 60000)) {
    try {
      const res = await axios.post(`https://${auth.base_domain}/oauth2/access_token`, {
        client_id: KOMMO_CLIENT_ID,
        client_secret: KOMMO_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: auth.refresh_token,
        redirect_uri: auth.redirect_uri
      });
      auth = {
        ...auth,
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        expires_at: Date.now() + (res.data.expires_in * 1000)
      };
      db.set("kommoAuth", auth).write();
    } catch (e) {
      const errorData = (e.response && e.response.data) ? JSON.stringify(e.response.data) : e.message;
      console.error("Erro ao renovar token Kommo", errorData);
      return null;
    }
  }
  return auth;
}

/**
 * POST /submit
 * Recebe o formulário de contato, salva e dispara para o Kommo e os webhooks cadastrados.
 */
app.post("/submit", submitLimiter, async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Nome e telefone são obrigatórios." });
  }

  const submission = {
    id: Date.now().toString(),
    name: name.trim(),
    phone: phone.trim(),
    email: (email && email.trim) ? email.trim() : null,
    message: (message && message.trim) ? message.trim() : null,
    createdAt: new Date().toISOString(),
    webhooksSent: [],
    webhookErrors: [],
  };

  db.get("submissions").push(submission).write();

  // 1. Criação no Kommo (Complex API)
  const kommoAuth = await getKommoToken();
  const config = db.get("kommoConfig").value();

  if (kommoAuth && config && config.pipeline_id && config.status_id) {
    try {
      const lead_custom_fields = [];
      const contact_custom_fields = [];

      function parseField(val, content) {
        if (!val || !content) return;
        const parts = val.split('_');
        if (parts.length !== 2) return;
        const type = parts[0];
        const id = parseInt(parts[1]);
        if (isNaN(id)) return;
        
        const mapped = { field_id: id, values: [{ value: content }] };
        if (type === 'lead') lead_custom_fields.push(mapped);
        if (type === 'contact') contact_custom_fields.push(mapped);
      }

      parseField(config.field_email, email);
      parseField(config.field_phone, phone);
      parseField(config.field_message, message);

      // Mapeamento dinâmico de Especialidade/Fonte
      if (req.body.source && config.field_specialty && config.page_mappings) {
        const optionId = config.page_mappings[req.body.source];
        if (optionId) {
          parseField(config.field_specialty, parseInt(optionId));
        }
      }

      await axios.post(`https://${kommoAuth.base_domain}/api/v4/leads/complex`, [
         {
           name: `Avaliação - ${name}`,
           pipeline_id: parseInt(config.pipeline_id),
           status_id: parseInt(config.status_id),
           custom_fields_values: lead_custom_fields.length > 0 ? lead_custom_fields : undefined,
           _embedded: {
             contacts: [
               {
                 first_name: name,
                 custom_fields_values: contact_custom_fields.length > 0 ? contact_custom_fields : undefined
               }
             ]
           }
         }
      ], { 
         headers: { Authorization: `Bearer ${kommoAuth.access_token}` } 
      });
    } catch(err) {
      const errorData = (err.response && err.response.data) ? JSON.stringify(err.response.data) : err.message;
      console.error("Erro na criação do Kommo Lead:", errorData);
    }
  }

  // 2. Dispara webhooks comuns (Fire-and-forget)
  const webhooks = db.get("webhooks").filter({ active: true }).value();
  const webhookPromises = webhooks.map(async (wh) => {
    try {
      await axios.post(
        wh.url,
        {
          event: "form_submission",
          data: {
            name: submission.name,
            phone: submission.phone,
            email: submission.email,
            message: submission.message,
            submittedAt: submission.createdAt,
          },
        },
        {
          headers: { "Content-Type": "application/json", ...(wh.headers || {}) },
          timeout: 8000,
        }
      );
      db.get("submissions").find({ id: submission.id }).get("webhooksSent").push(wh.url).write();
    } catch (err) {
      db.get("submissions").find({ id: submission.id }).get("webhookErrors").push({ url: wh.url, error: err.message || "Erro" }).write();
    }
  });

  Promise.allSettled(webhookPromises);

  return res.status(200).json({ success: true, id: submission.id });
});

// ─────────────────────────────────────────────────────────
// ROTAS ADMIN (protegidas)
// ─────────────────────────────────────────────────────────

app.post("/admin/login", adminLimiter, async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Senha obrigatória." });

  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Senha incorreta." });

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "8h" });
  return res.json({ token });
});

app.get("/admin/webhooks", requireAuth, (_req, res) => res.json(db.get("webhooks").value()));

app.post("/admin/webhooks", requireAuth, (req, res) => {
  const { url, name, headers } = req.body;
  if (!url) return res.status(400).json({ error: "URL obrigatória." });

  const webhook = { id: Date.now().toString(), url, name: name || url, headers: headers || {}, active: true, createdAt: new Date().toISOString() };
  db.get("webhooks").push(webhook).write();
  res.status(201).json(webhook);
});

app.delete("/admin/webhooks/:id", requireAuth, (req, res) => {
  db.get("webhooks").remove({ id: req.params.id }).write();
  res.json({ success: true });
});

app.get("/admin/submissions", requireAuth, (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const all = db.get("submissions").orderBy("createdAt", "desc").value();
  res.json({ total: all.length, page, limit, data: all.slice((page - 1) * limit, page * limit) });
});

// ─────────────────────────────────────────────────────────
// ROTAS KOMMO CRM
// ─────────────────────────────────────────────────────────

app.get("/admin/kommo/status", requireAuth, (req, res) => {
  const auth = db.get("kommoAuth").value();
  const config = db.get("kommoConfig").value();
  const redirect_uri = `${req.protocol}://${req.headers.host}/admin/kommo/callback`;
  
  res.json({ 
     authorized: !!(auth && auth.access_token), 
     domain: auth ? auth.base_domain : null,
     client_id: KOMMO_CLIENT_ID,
     redirect_uri,
     config: config || {}
  });
});

app.get("/admin/kommo/callback", async (req, res) => {
  const { code, referer, client_id } = req.query;
  if(!code || !referer) return res.send("Erro: callback incorreto do Kommo.");
  
  const redirect_uri = `${req.protocol}://${req.headers.host}/admin/kommo/callback`;
  
  try {
     const tokens = await axios.post(`https://${referer}/oauth2/access_token`, {
        client_id: KOMMO_CLIENT_ID,
        client_secret: KOMMO_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri
     });
     
     db.set("kommoAuth", {
        base_domain: referer,
        access_token: tokens.data.access_token,
        refresh_token: tokens.data.refresh_token,
        expires_at: Date.now() + (tokens.data.expires_in * 1000),
        redirect_uri
     }).write();
     
     res.send("<div style='font-family:sans-serif;text-align:center;padding:50px;'>Autenticado com sucesso! O Webhook agora tem acesso ao Kommo.<br><br><button onclick='window.close()'>Pode fechar esta aba</button></div>");
  } catch(err) {
     const errorData = (err.response && err.response.data) ? JSON.stringify(err.response.data) : err.message;
     res.send(`<div style='color:red'>Erro ao autenticar: ${errorData}</div>`);
  }
});

app.get("/admin/kommo/pipelines", requireAuth, async (req, res) => {
  const auth = await getKommoToken();
  if(!auth) return res.status(403).json({error: "Kommo não autenticado ou token expirado. Por favor, autorize novamente."});
  try {
    const response = await axios.get(`https://${auth.base_domain}/api/v4/leads/pipelines`, {
      headers: { Authorization: `Bearer ${auth.access_token}` }
    });
    res.json(response.data._embedded.pipelines);
  } catch(err) {
    res.status(500).json({error: err.message});
  }
});

app.get("/admin/kommo/fields", requireAuth, async (req, res) => {
  const auth = await getKommoToken();
  if(!auth) return res.status(403).json({error: "Kommo não autenticado ou token expirado. Por favor, autorize novamente."});
  try {
    const reqLeads = axios.get(`https://${auth.base_domain}/api/v4/leads/custom_fields`, { headers: { Authorization: `Bearer ${auth.access_token}` } }).catch(() => ({ data: {} }));
    const reqContacts = axios.get(`https://${auth.base_domain}/api/v4/contacts/custom_fields`, { headers: { Authorization: `Bearer ${auth.access_token}` } }).catch(() => ({ data: {} }));
    const [leadsResp, contactsResp] = await Promise.all([reqLeads, reqContacts]);

    res.json({
      leads: leadsResp.data._embedded ? leadsResp.data._embedded.custom_fields : [],
      contacts: contactsResp.data._embedded ? contactsResp.data._embedded.custom_fields : []
    });
  } catch(err) {
    res.status(500).json({error: err.message});
  }
});

app.post("/admin/kommo/config", requireAuth, (req, res) => {
  db.set("kommoConfig", req.body).write();
  res.json({ success: true });
});

// ── Inicia ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Elysium Webhook Server rodando na porta ${PORT}`);
});

module.exports = app;
