/**
 * FitChef.pro - Serviço de IA (Google Gemini)
 * 
 * Este serviço gerencia a comunicação com a API do Google Gemini
 * para geração de planos alimentares personalizados.
 * 
 * A chave API é mantida segura no backend, nunca exposta ao cliente.
 * 
 * @author FitChef Team
 * @version 2.0.0
 */

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import type { ClientData, DayPlan, MealPlan, ShoppingList, WeeklySummary } from '../types/index.js';
import { generateSystemPrompt } from '../utils/aiPrompt.js';

// Inicializar cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Número máximo de retries para rate limiting
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 40000; // 40 segundos (API exige ~36s entre requests)

/**
 * Função auxiliar para delay
 */
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Gera um plano alimentar usando a API do Google Gemini
 * 
 * @param clientData - Dados do cliente coletados pelo wizard
 * @returns Plano alimentar gerado pela IA
 */
export async function generateMealPlanWithAI(clientData: ClientData): Promise<MealPlan> {
    console.log('🤖 Iniciando geração com Gemini AI...');
    console.log(`📊 Cliente: ${clientData.name}, Calorias: ${clientData.targetCalories}`);

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            // Obter modelo
            const model: GenerativeModel = genAI.getGenerativeModel({
                model: process.env.AI_MODEL || 'gemini-2.0-flash',
                generationConfig: {
                    temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
                    maxOutputTokens: parseInt(process.env.AI_MAX_TOKENS || '8192'),
                },
            });

            // Gerar o prompt personalizado
            const systemPrompt = generateSystemPrompt(clientData);

            // Fazer a chamada à API
            console.log(`📤 Enviando prompt para Gemini... (tentativa ${attempt}/${MAX_RETRIES})`);
            const result = await model.generateContent(systemPrompt);
            const response = result.response;
            const text = response.text();

            console.log('📥 Resposta recebida do Gemini');
            console.log('📝 Tamanho da resposta:', text.length, 'caracteres');

            // Parse do JSON retornado
            let aiResponse: {
                weeklySummary: WeeklySummary;
                schedule: DayPlan[];
                shoppingList: ShoppingList;
            };

            try {
                // Tentar fazer parse direto
                aiResponse = JSON.parse(text);
            } catch (parseError) {
                // Se falhar, tentar extrair JSON de dentro de markdown
                console.log('⚠️ Tentando extrair JSON de resposta com markdown...');
                const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) ||
                    text.match(/```\s*([\s\S]*?)\s*```/) ||
                    [null, text];

                if (jsonMatch && jsonMatch[1]) {
                    aiResponse = JSON.parse(jsonMatch[1].trim());
                } else {
                    throw new Error('Não foi possível extrair JSON válido da resposta');
                }
            }

            // Validar estrutura básica
            if (!aiResponse.schedule || !Array.isArray(aiResponse.schedule)) {
                throw new Error('Resposta da IA não contém o campo "schedule" esperado');
            }

            // Construir objeto MealPlan completo
            const mealPlan: MealPlan = {
                clientName: clientData.name,
                targetCalories: clientData.targetCalories,
                generatedAt: new Date().toISOString(),
                weeklySummary: aiResponse.weeklySummary || calculateWeeklySummary(clientData.targetCalories),
                schedule: aiResponse.schedule,
                shoppingList: aiResponse.shoppingList || generateDefaultShoppingList()
            };

            console.log('✅ Plano alimentar gerado com sucesso pela IA!');
            console.log(`📅 ${mealPlan.schedule.length} dias no plano`);

            return mealPlan;

        } catch (error: any) {
            lastError = error;

            // Verificar se é erro de rate limit (429)
            if (error?.status === 429) {
                console.log(`⏳ Rate limit atingido. Aguardando ${RETRY_DELAY_MS / 1000}s antes de tentar novamente...`);
                if (attempt < MAX_RETRIES) {
                    await delay(RETRY_DELAY_MS * attempt); // Backoff progressivo
                    continue;
                }
            }

            console.error(`❌ Erro na tentativa ${attempt}:`, error?.message || error);

            if (attempt < MAX_RETRIES && error?.status !== 401 && error?.status !== 403) {
                console.log(`⏳ Aguardando antes de tentar novamente...`);
                await delay(RETRY_DELAY_MS);
            }
        }
    }

    // Se chegou aqui, todas as tentativas falharam
    console.error('❌ Todas as tentativas de geração com IA falharam:', lastError);
    throw lastError || new Error('Falha na geração com IA após múltiplas tentativas');
}

/**
 * Calcula o resumo semanal baseado nas calorias alvo
 * (fallback caso a IA não retorne)
 */
function calculateWeeklySummary(targetCalories: number): WeeklySummary {
    const proteinCalories = targetCalories * 0.30;
    const carbsCalories = targetCalories * 0.40;
    const fatCalories = targetCalories * 0.30;

    return {
        totalProteinAvg: Math.round(proteinCalories / 4),
        totalCarbsAvg: Math.round(carbsCalories / 4),
        totalFatAvg: Math.round(fatCalories / 9),
        estimatedDailyCalories: targetCalories
    };
}

/**
 * Gera uma lista de compras padrão (fallback)
 */
function generateDefaultShoppingList(): ShoppingList {
    return {
        Proteins: ['Verificar receitas para lista completa'],
        Carbs: ['Verificar receitas para lista completa'],
        Fats: ['Verificar receitas para lista completa'],
        Vegetables: ['Verificar receitas para lista completa'],
        Other: ['Temperos e condimentos a gosto']
    };
}

/**
 * Verifica se a API do Gemini está configurada
 */
export function isGeminiConfigured(): boolean {
    return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 0;
}
