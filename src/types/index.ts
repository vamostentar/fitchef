/**
 * FitChef.pro - Tipos Compartilhados (Frontend)
 * 
 * Interfaces TypeScript para tipagem de dados.
 * Espelhado do backend para consistência.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

// ============================================================
// TIPOS DE ENTRADA
// ============================================================

export type ActivityLevel =
    | 'sedentary'
    | 'light'
    | 'moderate'
    | 'active'
    | 'very_active';

export type Goal = 'fat_loss' | 'muscle_gain' | 'maintenance';

export type DietType = 'omnivore' | 'vegetarian' | 'vegan' | 'paleo' | 'keto';

export type Gender = 'male' | 'female';

export interface ClientData {
    name: string;
    age: number;
    gender: Gender;
    height: number;
    weight: number;
    activityLevel: ActivityLevel;
    goal: Goal;
    targetCalories: number;
    dietType: DietType;
    allergies: string[];
    outputLanguage: 'pt-BR' | 'pt-PT' | 'en-US' | 'es-ES';
}

// ============================================================
// TIPOS DE SAÍDA
// ============================================================

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface Meal {
    type: MealType;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    recipe: string;
}

export interface DayPlan {
    day: string;
    meals: Meal[];
}

export interface WeeklySummary {
    totalProteinAvg: number;
    totalCarbsAvg: number;
    totalFatAvg: number;
    estimatedDailyCalories: number;
}

export interface ShoppingList {
    Proteins: string[];
    Carbs: string[];
    Fats: string[];
    Vegetables: string[];
    Other: string[];
}

export interface MealPlan {
    clientName: string;
    targetCalories: number;
    generatedAt: string;
    weeklySummary: WeeklySummary;
    schedule: DayPlan[];
    shoppingList: ShoppingList;
}

// ============================================================
// TIPOS DE API
// ============================================================

export interface GeneratePlanRequest {
    clientData: ClientData;
}

export interface GeneratePlanResponse {
    success: boolean;
    data?: MealPlan;
    error?: string;
}

// ============================================================
// TIPOS DO WIZARD
// ============================================================

export interface WizardStep {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    isActive: boolean;
}

// Labels para exibição em português
export const activityLevelLabels: Record<ActivityLevel, string> = {
    sedentary: 'Sedentário',
    light: 'Levemente Ativo',
    moderate: 'Moderadamente Ativo',
    active: 'Muito Ativo',
    very_active: 'Extremamente Ativo'
};

export const goalLabels: Record<Goal, string> = {
    fat_loss: 'Perda de Gordura',
    muscle_gain: 'Ganho de Massa',
    maintenance: 'Manutenção'
};

export const dietTypeLabels: Record<DietType, string> = {
    omnivore: 'Onívoro',
    vegetarian: 'Vegetariano',
    vegan: 'Vegano',
    paleo: 'Paleo',
    keto: 'Keto (Cetogênica)'
};

export const mealTypeLabels: Record<MealType, string> = {
    Breakfast: 'Café da Manhã',
    Lunch: 'Almoço',
    Dinner: 'Jantar',
    Snack: 'Lanche'
};
