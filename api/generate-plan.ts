/**
 * FitChef.pro - API Route: Generate Meal Plan
 * 
 * Vercel Serverless Function para geração de planos alimentares
 * usando Google Gemini AI.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// ============================================================
// TIPOS
// ============================================================

interface ClientData {
    name: string;
    age: number;
    gender: 'male' | 'female';
    height: number;
    weight: number;
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    goal: 'fat_loss' | 'muscle_gain' | 'maintenance';
    targetCalories: number;
    dietType: 'omnivore' | 'vegetarian' | 'vegan' | 'paleo' | 'keto';
    allergies: string[];
    outputLanguage: 'pt-BR' | 'pt-PT' | 'en-US' | 'es-ES';
}

interface Meal {
    type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    recipe: string;
}

interface DayPlan {
    day: string;
    meals: Meal[];
}

interface WeeklySummary {
    totalProteinAvg: number;
    totalCarbsAvg: number;
    totalFatAvg: number;
    estimatedDailyCalories: number;
}

interface ShoppingList {
    Proteins: string[];
    Carbs: string[];
    Fats: string[];
    Vegetables: string[];
    Other: string[];
}

interface MealPlan {
    clientName: string;
    targetCalories: number;
    generatedAt: string;
    weeklySummary: WeeklySummary;
    schedule: DayPlan[];
    shoppingList: ShoppingList;
}

// ============================================================
// PROMPT GENERATOR
// ============================================================

const activityDescriptions: Record<string, string> = {
    sedentary: 'sedentário (pouco ou nenhum exercício)',
    light: 'levemente ativo (exercício leve 1-3 dias/semana)',
    moderate: 'moderadamente ativo (exercício moderado 3-5 dias/semana)',
    active: 'muito ativo (exercício intenso 6-7 dias/semana)',
    very_active: 'extremamente ativo (exercício muito intenso diário)'
};

const goalDescriptions: Record<string, string> = {
    fat_loss: 'perda de gordura (déficit calórico)',
    muscle_gain: 'ganho de massa muscular (superávit calórico)',
    maintenance: 'manutenção do peso atual'
};

const dietRestrictions: Record<string, string> = {
    omnivore: 'Sem restrições alimentares específicas.',
    vegetarian: 'VEGETARIANO: Não incluir carnes, aves ou peixes. Ovos e laticínios são permitidos.',
    vegan: 'VEGANO: Não incluir NENHUM produto de origem animal.',
    paleo: 'PALEO: Evitar grãos, leguminosas, laticínios e alimentos processados.',
    keto: 'KETO: Máximo 20-30g de carboidratos por dia. Foco em gorduras saudáveis.'
};

function generateSystemPrompt(clientData: ClientData): string {
    const languageMap: Record<string, string> = {
        'pt-BR': 'Português Brasileiro',
        'pt-PT': 'Português Europeu (Portugal)',
        'en-US': 'English',
        'es-ES': 'Español'
    };

    const allergyList = clientData.allergies.length > 0
        ? `ALERGIAS: ${clientData.allergies.join(', ')}. NUNCA incluir estes ingredientes.`
        : 'Sem alergias.';

    return `### ROLE
Você é FitChefAI, um Nutricionista Esportivo de classe mundial.
Retorne APENAS JSON válido, sem markdown.

### DADOS DO CLIENTE
- Nome: ${clientData.name}
- Idade: ${clientData.age} anos
- Gênero: ${clientData.gender === 'male' ? 'Masculino' : 'Feminino'}
- Altura: ${clientData.height} cm | Peso: ${clientData.weight} kg
- Atividade: ${activityDescriptions[clientData.activityLevel]}
- Objetivo: ${goalDescriptions[clientData.goal]}
- Calorias: ${clientData.targetCalories} kcal/dia

### RESTRIÇÕES
${dietRestrictions[clientData.dietType]}
${allergyList}

### INSTRUÇÕES
1. Respeite ${clientData.targetCalories} kcal/dia (±50 kcal)
2. Macros: 30% Proteína, 40% Carbs, 30% Gordura
3. Idioma: ${languageMap[clientData.outputLanguage]}
4. 4 refeições/dia: Breakfast, Lunch, Dinner, Snack
5. 7 dias: Segunda a Domingo

### JSON FORMAT
{
  "weeklySummary": { "totalProteinAvg": number, "totalCarbsAvg": number, "totalFatAvg": number, "estimatedDailyCalories": number },
  "schedule": [{ "day": "Segunda-feira", "meals": [{ "type": "Breakfast", "name": "...", "calories": number, "protein": number, "carbs": number, "fats": number, "ingredients": ["..."], "recipe": "..." }] }],
  "shoppingList": { "Proteins": ["..."], "Carbs": ["..."], "Fats": ["..."], "Vegetables": ["..."], "Other": ["..."] }
}

GERE O PLANO:`;
}

// ============================================================
// MOCK DATA (FALLBACK)
// ============================================================

function generateMockMealPlan(name: string, calories: number): MealPlan {
    const proteinCal = calories * 0.30;
    const carbsCal = calories * 0.40;
    const fatCal = calories * 0.30;

    const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

    const schedule: DayPlan[] = days.map(day => ({
        day,
        meals: [
            { type: 'Breakfast' as const, name: 'Pequeno-almoço Proteico', calories: Math.round(calories * 0.25), protein: Math.round(proteinCal * 0.25 / 4), carbs: Math.round(carbsCal * 0.25 / 4), fats: Math.round(fatCal * 0.25 / 9), ingredients: ['Ovos', 'Pão integral', 'Abacate'], recipe: 'Preparar ovos mexidos com abacate.' },
            { type: 'Lunch' as const, name: 'Almoço Equilibrado', calories: Math.round(calories * 0.35), protein: Math.round(proteinCal * 0.35 / 4), carbs: Math.round(carbsCal * 0.35 / 4), fats: Math.round(fatCal * 0.35 / 9), ingredients: ['Frango grelhado', 'Arroz', 'Legumes'], recipe: 'Grelhar frango e servir com arroz e legumes.' },
            { type: 'Dinner' as const, name: 'Jantar Leve', calories: Math.round(calories * 0.30), protein: Math.round(proteinCal * 0.30 / 4), carbs: Math.round(carbsCal * 0.30 / 4), fats: Math.round(fatCal * 0.30 / 9), ingredients: ['Salmão', 'Batata doce', 'Brócolos'], recipe: 'Assar salmão com batata doce.' },
            { type: 'Snack' as const, name: 'Lanche Proteico', calories: Math.round(calories * 0.10), protein: Math.round(proteinCal * 0.10 / 4), carbs: Math.round(carbsCal * 0.10 / 4), fats: Math.round(fatCal * 0.10 / 9), ingredients: ['Iogurte grego', 'Frutos secos'], recipe: 'Misturar iogurte com frutos secos.' }
        ]
    }));

    return {
        clientName: name,
        targetCalories: calories,
        generatedAt: new Date().toISOString(),
        weeklySummary: {
            totalProteinAvg: Math.round(proteinCal / 4),
            totalCarbsAvg: Math.round(carbsCal / 4),
            totalFatAvg: Math.round(fatCal / 9),
            estimatedDailyCalories: calories
        },
        schedule,
        shoppingList: {
            Proteins: ['1kg Peito de frango', '500g Salmão', '12 Ovos'],
            Carbs: ['1kg Arroz integral', '1kg Batata doce', '500g Aveia'],
            Fats: ['200ml Azeite', '200g Abacate', '150g Frutos secos'],
            Vegetables: ['500g Brócolos', '300g Espinafres', '400g Legumes variados'],
            Other: ['Iogurte grego', 'Temperos', 'Limão']
        }
    };
}

// ============================================================
// VALIDAÇÃO
// ============================================================

function validateClientData(data: ClientData): { valid: boolean; error?: string } {
    if (!data.name?.trim()) return { valid: false, error: 'Nome é obrigatório' };
    if (!data.age || data.age < 10 || data.age > 120) return { valid: false, error: 'Idade inválida' };
    if (!['male', 'female'].includes(data.gender)) return { valid: false, error: 'Gênero inválido' };
    if (!data.height || data.height < 100 || data.height > 250) return { valid: false, error: 'Altura inválida' };
    if (!data.weight || data.weight < 30 || data.weight > 300) return { valid: false, error: 'Peso inválido' };
    if (!data.targetCalories || data.targetCalories < 1000) return { valid: false, error: 'Calorias inválidas' };
    return { valid: true };
}

// ============================================================
// HANDLER PRINCIPAL
// ============================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { clientData } = req.body as { clientData: ClientData };

        if (!clientData) {
            return res.status(400).json({ success: false, error: 'Dados do cliente não fornecidos' });
        }

        const validation = validateClientData(clientData);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }

        console.log(`🍳 Gerando plano para: ${clientData.name}`);

        let mealPlan: MealPlan;
        const apiKey = process.env.GEMINI_API_KEY;

        if (apiKey) {
            try {
                console.log('🤖 Usando Gemini AI...');
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({
                    model: 'gemini-2.0-flash',
                    generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
                });

                const prompt = generateSystemPrompt(clientData);
                const result = await model.generateContent(prompt);
                const text = result.response.text();

                // Parse JSON
                let aiResponse;
                try {
                    aiResponse = JSON.parse(text);
                } catch {
                    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || [null, text];
                    aiResponse = JSON.parse(jsonMatch[1]?.trim() || text);
                }

                mealPlan = {
                    clientName: clientData.name,
                    targetCalories: clientData.targetCalories,
                    generatedAt: new Date().toISOString(),
                    weeklySummary: aiResponse.weeklySummary,
                    schedule: aiResponse.schedule,
                    shoppingList: aiResponse.shoppingList
                };

                console.log('✅ Plano gerado com IA!');
            } catch (aiError) {
                console.error('⚠️ Erro IA, usando fallback:', aiError);
                mealPlan = generateMockMealPlan(clientData.name, clientData.targetCalories);
            }
        } else {
            console.log('⚠️ GEMINI_API_KEY não configurada, usando mock');
            mealPlan = generateMockMealPlan(clientData.name, clientData.targetCalories);
        }

        return res.status(200).json({ success: true, data: mealPlan });

    } catch (error) {
        console.error('❌ Erro:', error);
        return res.status(500).json({
            success: false,
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
