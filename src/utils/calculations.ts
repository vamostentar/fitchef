/**
 * FitChef.pro - Utilitários de Cálculos
 * 
 * Funções para cálculo de TMB, TDEE e macronutrientes
 * usando a fórmula de Harris-Benedict revisada.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import type { ActivityLevel, Gender, Goal } from '../types';

/**
 * Multiplicadores de nível de atividade para cálculo do TDEE
 */
const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,      // Pouco ou nenhum exercício
    light: 1.375,        // Exercício leve 1-3 dias/semana
    moderate: 1.55,      // Exercício moderado 3-5 dias/semana
    active: 1.725,       // Exercício intenso 6-7 dias/semana
    very_active: 1.9     // Exercício muito intenso, trabalho físico
};

/**
 * Ajustes calóricos baseados no objetivo
 */
const goalAdjustments: Record<Goal, number> = {
    fat_loss: -500,      // Déficit de 500 kcal para perda de ~0.5kg/semana
    muscle_gain: 300,    // Superávit de 300 kcal para ganho muscular
    maintenance: 0       // Manter peso atual
};

/**
 * Calcula a Taxa Metabólica Basal (TMB) usando Harris-Benedict Revisada
 * 
 * Fórmula para homens:
 * TMB = 88.362 + (13.397 × peso em kg) + (4.799 × altura em cm) − (5.677 × idade em anos)
 * 
 * Fórmula para mulheres:
 * TMB = 447.593 + (9.247 × peso em kg) + (3.098 × altura em cm) − (4.330 × idade em anos)
 * 
 * @param weight - Peso em kg
 * @param height - Altura em cm
 * @param age - Idade em anos
 * @param gender - Gênero ('male' ou 'female')
 * @returns TMB em kcal/dia
 */
export function calculateBMR(
    weight: number,
    height: number,
    age: number,
    gender: Gender
): number {
    if (gender === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
}

/**
 * Calcula o Gasto Energético Total Diário (TDEE)
 * 
 * TDEE = TMB × Multiplicador de Atividade
 * 
 * @param bmr - Taxa Metabólica Basal
 * @param activityLevel - Nível de atividade física
 * @returns TDEE em kcal/dia
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
    return bmr * activityMultipliers[activityLevel];
}

/**
 * Calcula as calorias alvo baseadas no objetivo
 * 
 * @param tdee - Gasto Energético Total Diário
 * @param goal - Objetivo (perda, ganho ou manutenção)
 * @returns Calorias alvo em kcal/dia
 */
export function calculateTargetCalories(tdee: number, goal: Goal): number {
    const targetCalories = tdee + goalAdjustments[goal];
    // Garantir mínimo de 1200 kcal por segurança
    return Math.max(Math.round(targetCalories), 1200);
}

/**
 * Calcula todas as métricas de uma vez
 * 
 * @param params - Parâmetros do cliente
 * @returns Objeto com TMB, TDEE e calorias alvo
 */
export function calculateAllMetrics(params: {
    weight: number;
    height: number;
    age: number;
    gender: Gender;
    activityLevel: ActivityLevel;
    goal: Goal;
}): {
    bmr: number;
    tdee: number;
    targetCalories: number;
} {
    const bmr = calculateBMR(params.weight, params.height, params.age, params.gender);
    const tdee = calculateTDEE(bmr, params.activityLevel);
    const targetCalories = calculateTargetCalories(tdee, params.goal);

    return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetCalories
    };
}

/**
 * Calcula a distribuição de macronutrientes
 * 
 * Distribuição padrão: 30% Proteína, 40% Carboidratos, 30% Gordura
 * 
 * @param targetCalories - Calorias alvo diárias
 * @param distribution - Distribuição percentual (opcional)
 * @returns Macros em gramas
 */
export function calculateMacros(
    targetCalories: number,
    distribution = { protein: 0.30, carbs: 0.40, fat: 0.30 }
): {
    protein: number;
    carbs: number;
    fat: number;
} {
    // Calorias por grama: Proteína=4, Carboidrato=4, Gordura=9
    return {
        protein: Math.round((targetCalories * distribution.protein) / 4),
        carbs: Math.round((targetCalories * distribution.carbs) / 4),
        fat: Math.round((targetCalories * distribution.fat) / 9)
    };
}

/**
 * Calcula o Índice de Massa Corporal (IMC)
 * 
 * @param weight - Peso em kg
 * @param height - Altura em cm
 * @returns IMC
 */
export function calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

/**
 * Retorna a classificação do IMC
 * 
 * @param bmi - Índice de Massa Corporal
 * @returns Classificação textual
 */
export function getBMIClassification(bmi: number): string {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    if (bmi < 35) return 'Obesidade Grau I';
    if (bmi < 40) return 'Obesidade Grau II';
    return 'Obesidade Grau III';
}
