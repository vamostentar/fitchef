/**
 * FitChef.pro - Servidor Principal
 * 
 * Entry point do backend. Configura Express, middlewares e rotas.
 * 
 * @author FitChef Team
 * @version 2.0.0 - Integração com Gemini AI
 */

// Carregar variáveis de ambiente ANTES de qualquer outro import
import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mealPlanRoutes from './routes/mealPlanRoutes.js';
import { isGeminiConfigured } from './services/aiService.js';

// Criar aplicação Express
const app = express();

// Porta do servidor (variável de ambiente ou padrão 3001)
const PORT = process.env.PORT || 3001;

// ============================================================
// MIDDLEWARES
// ============================================================

// Habilitar CORS para permitir requisições do frontend
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parser de JSON para requisições
app.use(express.json());

// Logger simples de requisições
app.use((req, _res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// ============================================================
// ROTAS
// ============================================================

// Rota raiz
app.get('/', (_req, res) => {
    res.json({
        name: 'FitChef.pro API',
        version: '1.0.0',
        description: 'API para geração de planos alimentares com IA',
        endpoints: {
            health: 'GET /api/health',
            generatePlan: 'POST /api/generate-plan'
        }
    });
});

// Rotas da API
app.use('/api', mealPlanRoutes);

// ============================================================
// TRATAMENTO DE ERROS
// ============================================================

// Rota não encontrada (404)
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint não encontrado',
        details: 'Verifique a URL e o método HTTP utilizado'
    });
});

// ============================================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================================

app.listen(PORT, () => {
    const aiStatus = isGeminiConfigured() ? '✅ Gemini AI Ativo' : '⚠️ Modo Mock';

    console.log('');
    console.log('🍳 ═══════════════════════════════════════════════════');
    console.log('');
    console.log('   ███████╗██╗████████╗ ██████╗██╗  ██╗███████╗███████╗');
    console.log('   ██╔════╝██║╚══██╔══╝██╔════╝██║  ██║██╔════╝██╔════╝');
    console.log('   █████╗  ██║   ██║   ██║     ███████║█████╗  █████╗  ');
    console.log('   ██╔══╝  ██║   ██║   ██║     ██╔══██║██╔══╝  ██╔══╝  ');
    console.log('   ██║     ██║   ██║   ╚██████╗██║  ██║███████╗██║     ');
    console.log('   ╚═╝     ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝     ');
    console.log('');
    console.log('🍳 ═══════════════════════════════════════════════════');
    console.log('');
    console.log(`   🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`   📡 API disponível em:   http://localhost:${PORT}/api`);
    console.log(`   🤖 Status IA: ${aiStatus}`);
    console.log('');
    console.log('   Endpoints:');
    console.log(`   • GET  /api/health        - Status do servidor`);
    console.log(`   • POST /api/generate-plan - Gerar plano alimentar`);
    console.log('');
    console.log('🍳 ═══════════════════════════════════════════════════');
    console.log('');
});
