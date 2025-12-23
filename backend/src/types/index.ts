/**
 * FitChef.pro - Tipos Compartilhados
 * 
 * Este arquivo contém todas as interfaces TypeScript utilizadas
 * para tipagem de dados entre o cliente e o servidor.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

// ============================================================
// TIPOS DE ENTRADA - Dados enviados pelo formulário do cliente
// ============================================================

/**
 * Nível de atividade física do cliente
 * Utilizado no cálculo de gasto calórico (Harris-Benedict)
 */
export type ActivityLevel =
    | 'sedentary'      // Sedentário (pouco ou nenhum exercício)
    | 'light'          // Levemente ativo (exercício leve 1-3 dias/semana)
    | 'moderate'       // Moderadamente ativo (exercício moderado 3-5 dias/semana)
    | 'active'         // Muito ativo (exercício intenso 6-7 dias/semana)
    | 'very_active';   // Extremamente ativo (exercício muito intenso, trabalho físico)

/**
 * Objetivo nutricional do cliente
 */
export type Goal = 'fat_loss' | 'muscle_gain' | 'maintenance';

/**
 * Tipo de dieta/preferência alimentar
 */
export type DietType = 'omnivore' | 'vegetarian' | 'vegan' | 'paleo' | 'keto';

/**
 * Gênero do cliente (para cálculos de TMB)
 */
export type Gender = 'male' | 'female';

/**
 * Dados biométricos e preferências do cliente
 * Coletados através do MealPlanWizard
 */
export interface ClientData {
    // Informações Pessoais
    name: string;
    age: number;
    gender: Gender;

    // Métricas Corporais
    height: number;      // em centímetros
    weight: number;      // em quilogramas
    activityLevel: ActivityLevel;

    // Objetivos
    goal: Goal;
    targetCalories: number;  // Pode ser calculado ou manual

    // Preferências Alimentares
    dietType: DietType;
    allergies: string[];     // Lista de alergias/exclusões

    // Configurações de Saída
    outputLanguage: 'pt-BR' | 'en-US' | 'es-ES';
}

// ============================================================
// TIPOS DE SAÍDA - Dados retornados pela API/IA
// ============================================================

/**
 * Tipo de refeição no plano alimentar
 */
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

/**
 * Estrutura de uma refeição individual
 */
export interface Meal {
    type: MealType;
    name: string;
    calories: number;
    protein: number;      // em gramas
    carbs: number;        // em gramas
    fats: number;         // em gramas
    ingredients: string[];
    recipe: string;       // Instruções de preparo
}

/**
 * Plano de um dia específico
 */
export interface DayPlan {
    day: string;  // Ex: "Segunda-feira", "Monday"
    meals: Meal[];
}

/**
 * Resumo semanal de macronutrientes
 */
export interface WeeklySummary {
    totalProteinAvg: number;
    totalCarbsAvg: number;
    totalFatAvg: number;
    estimatedDailyCalories: number;
}

/**
 * Categorias da lista de compras
 */
export interface ShoppingList {
    Proteins: string[];
    Carbs: string[];
    Fats: string[];
    Vegetables: string[];
    Other: string[];
}

/**
 * Plano alimentar completo gerado pela IA
 * Esta é a estrutura principal retornada pelo endpoint /api/generate-plan
 */
export interface MealPlan {
    // Metadados
    clientName: string;
    targetCalories: number;
    generatedAt: string;  // ISO date string

    // Resumo nutricional semanal
    weeklySummary: WeeklySummary;

    // Plano semanal detalhado (7 dias)
    schedule: DayPlan[];

    // Lista de compras agregada
    shoppingList: ShoppingList;
}

// ============================================================
// TIPOS DE API - Request/Response
// ============================================================

/**
 * Corpo da requisição para geração de plano
 */
export interface GeneratePlanRequest {
    clientData: ClientData;
}

/**
 * Resposta da API com o plano gerado
 */
export interface GeneratePlanResponse {
    success: boolean;
    data?: MealPlan;
    error?: string;
}

/**
 * Resposta de erro padrão da API
 */
export interface ApiError {
    success: false;
    error: string;
    details?: string;
}
