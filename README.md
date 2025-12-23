# FitChef.pro 🍳

**Gerador de Planos Alimentares com IA**

Aplicação full-stack para nutricionistas gerarem planos alimentares personalizados usando Google Gemini AI.

## 🚀 Deploy no Vercel

### 1. Push para GitHub
```bash
git add .
git commit -m "feat: preparar projeto para deploy Vercel"
git push origin main
```

### 2. Importar no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Importe o repositório `FitChef`
4. Vercel detecta automaticamente Vite

### 3. Configurar Variável de Ambiente
No Vercel Dashboard → Settings → Environment Variables:

| Nome | Valor |
|------|-------|
| `GEMINI_API_KEY` | Sua chave API do Google Gemini |

### 4. Deploy!
Clique **Deploy** e aguarde ~1 minuto.

---

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar frontend (dev)
npm run dev

# Rodar backend local (opcional)
cd backend && npm run dev
```

---

## 📁 Estrutura do Projeto

```
FitChef/
├── api/                  # Vercel Serverless Functions
│   └── generate-plan.ts  # API de geração de planos
├── src/                  # Frontend React
├── dist/                 # Build output
├── vercel.json           # Configuração Vercel
└── package.json          # Dependências unificadas
```

---

## ⚙️ Tecnologias

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Vercel Serverless Functions
- **IA:** Google Gemini API
- **PDF:** @react-pdf/renderer

---

## 📝 Licença

MIT © FitChef Team
