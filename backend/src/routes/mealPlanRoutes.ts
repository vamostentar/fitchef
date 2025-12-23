/**
 * FitChef.pro - Rotas da API
 * 
 * Define todas as rotas disponíveis na API do FitChef.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { Router } from 'express';
import { generatePlan, healthCheck } from '../controllers/mealPlanController.js';

const router = Router();

/**
 * GET /api/health
 * Verifica status do servidor
 */
router.get('/health', healthCheck);

/**
 * POST /api/generate-plan
 * Gera um plano alimentar baseado nos dados do cliente
 * 
 * Body esperado:
 * {
 *   "clientData": {
 *     "name": "João Silva",
 *     "age": 30,
 *     "gender": "male",
 *     "height": 175,
 *     "weight": 80,
 *     "activityLevel": "moderate",
 *     "goal": "fat_loss",
 *     "targetCalories": 2000,
 *     "dietType": "omnivore",
 *     "allergies": [],
 *     "outputLanguage": "pt-BR"
 *   }
 * }
 */
router.post('/generate-plan', generatePlan);

export default router;
