/**
 * FitChef.pro - Controller de Planos Alimentares
 * 
 * Este controller gerencia a lógica de negócio para geração
 * de planos alimentares usando a API do Google Gemini.
 * 
 * @author FitChef Team
 * @version 2.0.0 - Integração com Gemini AI
 */

import type { Request, Response } from 'express';
import { generateMockMealPlan } from '../mocks/mealPlanMock.js';
import { generateMealPlanWithAI, isGeminiConfigured } from '../services/aiService.js';
import type {
    ApiError,
    ClientData,
    GeneratePlanRequest,
    GeneratePlanResponse
} from '../types/index.js';

/**
 * Valida os dados do cliente recebidos na requisição
 * 
 * @param clientData - Dados a serem validados
 * @returns Objeto com resultado da validação e mensagem de erro
 */
function validateClientData(clientData: ClientData): { valid: boolean; error?: string } {
    // Verificar campos obrigatórios
    if (!clientData.name || clientData.name.trim().length === 0) {
        return { valid: false, error: 'Nome do cliente é obrigatório' };
    }

    if (!clientData.age || clientData.age < 10 || clientData.age > 120) {
        return { valid: false, error: 'Idade deve estar entre 10 e 120 anos' };
    }

    if (!clientData.gender || !['male', 'female'].includes(clientData.gender)) {
        return { valid: false, error: 'Gênero deve ser "male" ou "female"' };
    }

    if (!clientData.height || clientData.height < 100 || clientData.height > 250) {
        return { valid: false, error: 'Altura deve estar entre 100 e 250 cm' };
    }

    if (!clientData.weight || clientData.weight < 30 || clientData.weight > 300) {
        return { valid: false, error: 'Peso deve estar entre 30 e 300 kg' };
    }

    const validActivityLevels = ['sedentary', 'light', 'moderate', 'active', 'very_active'];
    if (!clientData.activityLevel || !validActivityLevels.includes(clientData.activityLevel)) {
        return { valid: false, error: 'Nível de atividade inválido' };
    }

    const validGoals = ['fat_loss', 'muscle_gain', 'maintenance'];
    if (!clientData.goal || !validGoals.includes(clientData.goal)) {
        return { valid: false, error: 'Objetivo inválido' };
    }

    if (!clientData.targetCalories || clientData.targetCalories < 1000 || clientData.targetCalories > 6000) {
        return { valid: false, error: 'Calorias alvo devem estar entre 1000 e 6000' };
    }

    const validDietTypes = ['omnivore', 'vegetarian', 'vegan', 'paleo', 'keto'];
    if (!clientData.dietType || !validDietTypes.includes(clientData.dietType)) {
        return { valid: false, error: 'Tipo de dieta inválido' };
    }

    return { valid: true };
}

/**
 * Endpoint: POST /api/generate-plan
 * 
 * Gera um plano alimentar completo baseado nos dados do cliente.
 * Usa Google Gemini AI para geração real, com fallback para mock.
 * 
 * @param req - Request Express contendo ClientData no body
 * @param res - Response Express
 */
export async function generatePlan(
    req: Request<{}, GeneratePlanResponse | ApiError, GeneratePlanRequest>,
    res: Response<GeneratePlanResponse | ApiError>
): Promise<void> {
    try {
        const { clientData } = req.body;

        // Validar entrada
        if (!clientData) {
            res.status(400).json({
                success: false,
                error: 'Dados do cliente não fornecidos',
                details: 'O corpo da requisição deve conter um objeto "clientData"'
            });
            return;
        }

        // Validar campos do cliente
        const validation = validateClientData(clientData);
        if (!validation.valid) {
            res.status(400).json({
                success: false,
                error: 'Dados inválidos',
                details: validation.error
            });
            return;
        }

        console.log('='.repeat(60));
        console.log(`🍳 Gerando plano para: ${clientData.name}`);
        console.log(`📊 Calorias: ${clientData.targetCalories} kcal | Dieta: ${clientData.dietType}`);
        console.log('='.repeat(60));

        let mealPlan;

        // Verificar se Gemini está configurado
        if (isGeminiConfigured()) {
            console.log('🤖 Usando Google Gemini AI...');

            try {
                mealPlan = await generateMealPlanWithAI(clientData);
                console.log('✅ Plano gerado com IA!');
            } catch (aiError) {
                console.error('⚠️ Erro na IA, usando fallback mock:', aiError);
                mealPlan = generateMockMealPlan(clientData.name, clientData.targetCalories);
                console.log('📦 Plano gerado com dados mock (fallback)');
            }
        } else {
            console.log('⚠️ Gemini API não configurada, usando mock...');
            mealPlan = generateMockMealPlan(clientData.name, clientData.targetCalories);
            console.log('📦 Plano gerado com dados mock');
        }

        console.log('='.repeat(60));

        res.status(200).json({
            success: true,
            data: mealPlan
        });

    } catch (error) {
        console.error('❌ Erro ao gerar plano:', error);

        res.status(500).json({
            success: false,
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
}

/**
 * Endpoint: GET /api/health
 * 
 * Verifica se o servidor está funcionando corretamente.
 */
export function healthCheck(_req: Request, res: Response): void {
    res.status(200).json({
        status: 'ok',
        service: 'FitChef API',
        version: '2.0.0',
        aiEnabled: isGeminiConfigured(),
        timestamp: new Date().toISOString()
    });
}
